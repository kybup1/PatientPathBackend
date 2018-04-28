
var jwt = require("jwt-simple")


var auth = {};
secret = "beer";

auth.secret = secret;
auth.authenticate = function(req, res, next){
    var token = req.get("token");
    if (token){
        try {
            var decoded = jwt.decode(token, secret);
            next();
        } catch (err) {
            res.json({
                "ERROR" : "Invalid Token"
            })
        }
    } else {
        res.sendStatus(403);
    }
}

auth.getPatId = function (token){
    var decoded = jwt.decode(token, secret);
    console.log(decoded);
    return decoded.patid;
}

auth.getPractId = function (token){
    var decoded = jwt.decode(token, secret);
    return decoded.practid;
}

module.exports = auth;