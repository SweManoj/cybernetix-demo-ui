var express = require('express'),
    router = express.Router(),
    queryParams = require('./common/queryParams'),
    mongojs = require("mongojs"),
    config = require('./common/config'),
    connectionString = config.production ? config.prodConnectionString : config.connectionString,
    db = mongojs(connectionString);

var authenticate = require('./middlewares/validateRequest');

router.get('/firewallRiskyUsers', authenticate, (req, res, next) => {
    var records = queryParams.getLimit(),
        page = queryParams.getOffset(),
        totalRecords;

    var skip = parseInt(records * page);
    db.collection('riskyusers').find({}, {}).count((e, count) => {
        totalRecords = count;
    });

    db.collection('riskyusers')
        .find({}, {}, {sort: {_id: -1}, skip: skip, limit: records}, (error, data) => {
            if (error) {
                res.json([]);
            } else {
                res.json({
                    status: true,
                    data: data,
                    _totalRecords: totalRecords
                });
            }
        });
    //db.collection('riskyusers').find({}, {_id: 0, userid: 1}).sort({_id: -1})._limit(records)
});
// Dashboard getThreats widget
router.get('/getThreats', authenticate, (req, res, next) => {
    var records = queryParams.getLimit(),
        page = queryParams.getOffset(),
        skip = parseInt(records * page);

    db.collection('ruledescription').aggregate([
        {
            $lookup: {
                from: "riskyusers",
                localField: "ruleid",
                foreignField: "ruleid",
                as: "matched"
            }
        },
        {
            $sort: {
                "matched.isotimestamp": -1
            }
        },
        {
            $project: {
                "matched.isotimestamp": 1,
                ruleid: 1,
                title: 1,
                description: 1
            }
        },
        {
            $project: {
                displaytimestamp: {
                    $arrayElemAt: [
                        "$matched", 0
                    ]
                },
                ruleid: 1,
                title: 1,
                description: 1,
                count: {
                    $size: "$matched"
                }
            }
        },
        {$skip: skip},
        {$limit: records}
    ], function (error, data) {
        if (error || !data.length) {
            res.json([]);
        } else {
            res.json({data: data});
        }
    });
});
// Dashboard getViolations widget
router.get('/getViolations', authenticate, (req, res, next) => {
    var records = queryParams.getLimit(),
        page = queryParams.getOffset(),
        skip = parseInt(records * page);

    db.collection('riskyusers').aggregate([
        {
            $group: {
                _id: "$violation",
                count: {
                    $sum: 1
                }
            }
        }
    ], (error, data) => {
        if (error || !data.length) {
            res.json([]);
        } else {
            res.json({
                data: data
            });
        }
    });
});
//Dashboard attackTypes widget
router.get('/getAttackDetails', authenticate, (req, res, next) => {
    db.collection('riskyusers').aggregate([
        {
            $group: {
                _id: "$attacktype",
                count: {
                    $sum: 1
                }
            }
        }
    ], (error, data) => {
        if (error || !data.length) {
            res.json([]);
        } else {
            res.json({
                data: data
            });
        }
    });
});
router.get('/get_Userdata_by_Source', authenticate, (req, res, next) => {
    var sourceId = req.query.source;
    var resource = req.query.resource;
    var userInfo = null;
    var totalScore = null;
    if (resource === 'true') {
        db.collection('riskyusers').aggregate([
            {$match:  {userid: sourceId}},
            {$group : {_id:"",total: {$sum: "$riskscore"}}},
            {$project: {total_riskscore: "$total",_id:0}}
        ], (error, totalScoreData) => {
            if (error) {
                res.json([]);
            } else {
                totalScore = totalScoreData[0];
            }
        });
        db.collection('riskyusers').aggregate([
            {$match: {ipaddress: sourceId}},
            {$group: {_id: {userid: "$userid", ruleid: "$ruleid", isotimestamp: "$isotimestamp"}}},
            {$project: {userid: "$_id.userid", ruleid: "$_id.ruleid", isotimestamp: "$_id.isotimestamp"}},
            {$lookup: {from: "ruledescription", localField: "ruleid", foreignField: "ruleid", as: "ruleInfo"}},
            {$sort: {"_id.isotimestamp": -1}},
            {
                $project: {
                    "ruleInfo.ruleid": 1,
                    "ruleInfo.title": 1,
                    "ruleInfo.description": 1,
                    userid: 1,
                    riskscore: 1,
                    isotimestamp: 1,
                    _id: 0
                }
            }
        ], (error, data) => {
            if (error || !data.length) {
                res.json([]);
            } else {
                res.json({
                    userInfo: [],
                    data: data,
                    totalScore: totalScore
                });
            }
        });
    } else {
        db.collection('hr_data').find({UserId: sourceId}, (error, data) => {
            if (error) {
                res.json([]);
            } else {
                userInfo = data;
            }
        });
        db.collection('riskyusers').aggregate([
            {$match:  {userid: sourceId}},
            {$group : {_id:"",total: {$sum: "$riskscore"}}},
            {$project: {total_riskscore: "$total",_id:0}}
        ], (error, totalScoreData) => {
            if (error) {
                res.json([]);
            } else {
                totalScore = totalScoreData[0];
            }
        });
        db.collection('riskyusers').aggregate([
            {$match: {userid: sourceId}},
            {$lookup: {from: "ruledescription", localField: "ruleid", foreignField: "ruleid", as: "ruleInfo"}},
            {$sort: {"_id.isotimestamp": -1}},
            {
                $project: {
                    "ruleInfo.ruleid": 1,
                    "ruleInfo.title": 1,
                    "ruleInfo.description": 1,
                    userid: 1,
                    riskscore: 1,
                    isotimestamp: 1,
                    _id: 0
                }
            }
        ], (error, data) => {
            if (error || !data.length) {
                res.json([]);
            } else {
                res.json({
                    userInfo: userInfo,
                    data: data,
                    totalScore: totalScore
                });
            }
        });
    }
});
router.get('/get_Userdata_by_SourceModel', authenticate, (req, res, next) => {
    var sourceId = req.query.source;
    var resource = req.query.resource;
    var userInfo = null,
        totalScore = null;
    if (resource === 'true') {
        db.collection('riskyusers_models').aggregate([
            {$match:  {userid: sourceId}},
            {$group : {_id:"",total: {$sum: "$riskscore"}}},
            {$project: {total_riskscore: "$total",_id:0}}
        ], (error, totalScoreData) => {
            if (error) {
                res.json([]);
            } else {
                totalScore = totalScoreData[0];
            }
        });
        db.collection('riskyusers_models').aggregate([
            {$match: {ipaddress: sourceId}},
            {$group: {_id: {userid: "$userid", ruleid: "$ruleid", isotimestamp: "$isotimestamp"}}},
            {$project: {userid: "$_id.userid", ruleid: "$_id.ruleid", isotimestamp: "$_id.isotimestamp"}},
            {$lookup: {from: "ruledescription", localField: "ruleid", foreignField: "ruleid", as: "ruleInfo"}},
            {$sort: {"_id.isotimestamp": -1}},
            {
                $project: {
                    "ruleInfo.ruleid": 1,
                    "ruleInfo.title": 1,
                    "ruleInfo.description": 1,
                    userid: 1,
                    riskscore: 1,
                    isotimestamp: 1,
                    _id: 0
                }
            }
        ], (error, data) => {
            if (error || !data.length) {
                res.json([]);
            } else {
                res.json({
                    userInfo: [],
                    data: data,
                    totalScore: totalScore
                });
            }
        });
    } else {
        db.collection('hr_data').find({UserId: sourceId}, (error, data) => {
            if (error) {
                res.json([]);
            } else {
                userInfo = data;
            }
        });
        db.collection('riskyusers_models').aggregate([
            {$match:  {userid: sourceId}},
            {$group : {_id:"",total: {$sum: "$riskscore"}}},
            {$project: {total_riskscore: "$total",_id:0}}
        ], (error, totalScoreData) => {
            if (error) {
                res.json([]);
            } else {
                totalScore = totalScoreData[0];
            }
        });
        db.collection('riskyusers_models').aggregate([
            {$match: {userid: sourceId}},
            {$group: {_id: {userid: "$userid", ruleid: "$ruleid", isotimestamp: "$isotimestamp"}}},
            {$project: {userid: "$_id.userid", ruleid: "$_id.ruleid", isotimestamp: "$_id.isotimestamp"}},
            {$lookup: {from: "ruledescription", localField: "ruleid", foreignField: "ruleid", as: "ruleInfo"}},
            {$sort: {"_id.isotimestamp": -1}},
            {
                $project: {
                    "ruleInfo.ruleid": 1,
                    "ruleInfo.title": 1,
                    "ruleInfo.description": 1,
                    userid: 1,
                    riskscore: 1,
                    isotimestamp: 1,
                    _id: 0
                }
            }
        ], (error, data) => {
            if (error || !data.length) {
                res.json([]);
            } else {
                res.json({
                    userInfo: userInfo,
                    data: data,
                    totalScore: totalScore
                });
            }
        });
    }
});

// Dashboard top pieCharts data API
router.get('/getSummary', authenticate, (req, res, next) => {
    var totalRiskyUsers;
    var riskyUsers;

    var totalResources;
    var riskyResources;

    var totalAccounts;
    var riskyAccounts;

    // Fetching totalRiskyUsers count from hr_table
    db.collection('hr_data').find({UserId: {$nin: [ /Adm/, /Svc/, "" ]}}, {}).count((e, count) => {
        totalRiskyUsers = count;

        // Fetching riskyUsers count from riskyUsers Table
        db.collection('riskyusers').find({userid: {$nin: [ /Adm/, /Svc/, "" ]}}, {}).count((e, count) => {
            riskyUsers = count;

            // Fetching totalResources count from hr_table
            db.collection('hr_data').find({UserId: ""}, {}).count((e, count) => {
                totalResources = count;

                // Fetching riskyResources count from riskyUsers Table
                db.collection('riskyusers').find({userid: ""}, {}).count((e, count) => {
                    riskyResources = count;

                    // Fetching totalAccounts count from hr_table
                    db.collection('hr_data').find({UserId: {$in: [ /Adm/, /Svc/ ]}}, {}).count((e, count) => {
                        totalAccounts = count;

                        // Fetching riskyAccounts count from riskyUsers Table
                        db.collection('riskyusers').find({userid: {$in: [ /Adm/, /Svc/ ]}}, {}).count((e, count) => {
                            riskyAccounts = count;
                            res.json({
                                status: true,
                                _results: [
                                    {
                                        title: 'Risky Users',
                                        total: totalRiskyUsers,
                                        count: riskyUsers
                                    },{
                                        title: 'Risky Resources',
                                        total: totalResources,
                                        count: riskyResources
                                    },{
                                        title: 'Risky Accounts',
                                        total: totalAccounts,
                                        count: riskyAccounts
                                    }
                                ]
                            });
                        });
                    });
                });
            });
        });
    });
});
//ViolationSummary pop up
router.get('/getViolationSummary',authenticate, (req,res,next) => {
    var ruleId = parseInt(req.query.ruleId);
    var userId =  req.query.userId;
    var isoTimeStamp = req.query.timeStamp;
    console.log("isotimestamp = "+isoTimeStamp);
    db.collection('riskyusers').find( { ruleid: ruleId , userid: userId , isotimestamp: {$gte:new Date(isoTimeStamp)}} ,function(err, result){
        if(err){
            res.json({});
        }else{
            res.json({
                data:result
            });
        }
       
    } )
});


router.get('/getAllCases' , authenticate , (req,res,next) => {
    db.collection("case_managment").find( {} ,function(err, result){
        if(err){
            res.json({});
        }else{
            res.json({
                data:result
            });
        }
       
    } )
}

);


module.exports = router;
