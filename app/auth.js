
var jwt = require("jwt-simple")


var auth = {};
//The secret to build the JSON Web tokens.
//Normally this secret should not be directly in the code since this is a prototype this can be ignored.
secret = "beer";

auth.secret = secret;

//This method is used to check the autentification when a request is send to the backend
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

//This method decrypts the token and returns the contained id of the patient
auth.getPatId = function (token){
    var decoded = jwt.decode(token, secret);
    console.log(decoded);
    return decoded.patid;
}

//This method decryptes the token and returns the id of the corresponding practitioner
auth.getPractId = function (token){
    var decoded = jwt.decode(token, secret);
    return decoded.practid;
}

module.exports = auth;