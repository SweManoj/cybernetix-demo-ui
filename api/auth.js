var express = require('express'),
    router = express.Router(),
    queryParams = require('./common/queryParams'),
    mongojs = require("mongojs"),
    config = require('./common/config'),
    connectionString = config.production ? config.prodConnectionString: config.connectionString,
    db = mongojs(connectionString);

var jsonToken = require('jwt-simple');
var crypto = require('crypto');
var algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
var encrypt = function (text) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

var decrypt = function (text) {
    var decipher = crypto.createDecipher(algorithm, password);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

router.post('/authLog', function (req, res, next) {
    db.collection('hr_data').find({
        UserId: req.body.username,
        password: encrypt(req.body.password)
    }, function (error, data) {
        if (error) {
            res.json({status: "false", msg: error});
            return;
        }
        if (data.length === 0) {
            res.json({status: "false", data: "Please enter valid ID and password"});
            return;
        }
        res.json(genToken(data));
    });
});

function genToken(data) {
    var expires = expiresIn(320000000);
    var token = jsonToken.encode({exp: expires},
        require('./middlewares/config/secret')());
    return {
        status: "true",
        data: data,
        authToken: token,
        expires: expires
    };
}

function expiresIn(numDays) {
    var dateObj = Date.now() + numDays;
    return dateObj;
}

module.exports = router;
