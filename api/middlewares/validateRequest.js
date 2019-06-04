var jwt = require('jwt-simple');
module.exports = function (req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers[ 'token' ];
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers[ 'x-key' ];
    if (token || key) {
        try {
            var decoded = jwt.decode(token, require('./config/secret.js')());
            if (decoded.exp <= Date.now()) {
                res.json({
                    "status": 400,
                    "message": "Token Expired.Please Re-login"
                });
                return;
            }
            var dbUser = validateUser(key);
            // The key would be the logged in user's username
            if (dbUser) {
                if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/') >= 0)) {
                    next(); // To move to next middleware
                } else {
                    res.json({
                        "status": false,
                        "message": "Not Authorized"
                    });
                    return;
                }
            } else {
                // No user with this name exists, respond back with a 401
                res.json({
                    "status": false,
                    "message": "Invalid User"
                });
                return;
            }
        } catch (err) {
            res.json({
                "status": false,
                "message": "Oops something went wrong",
                "error": err
            });
        }
    } else {
        res.status(401);
        res.json({
            "status": false,
            "message": "Invalid Token or Key"
        });
        return;
    }

    function validateUser(key) {
        var dbUserObj = { // spoofing a userobject from the DB.
            name: 'durgaprasad',
            role: 'developer'
        };
        return dbUserObj;
    }
};
