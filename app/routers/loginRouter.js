var express = require("express");
var app = express();
var db = require("../models/index");
var jwt = require("jwt-simple");

var loginRouter = express.Router();

var auth = require("../auth");
var secret = auth.secret;

loginRouter.post("/login/patient", function(req, res){
    if(req.body.username && req.body.password){
        var username = req.body.username;
        var password = req.body.password;
        db.user.find({
            where : {"username" : username,
                    "password" : password}
        }).then(function(user){
            if(!user){
                res.json({
                    "error" : "User not found!"
                })
            } else {
                user.getPatient().then(function(patient){
                    var payload = {
                        "username" : user.username,
                        "patid" : patient.patid
                    }
                    var token = jwt.encode(payload, secret)
                    res.json({
                        "token" : token
                    })
                })
            }
        })
    } else {
       res.json({error : "please submit username and password"})
    }
})

loginRouter.post("/login/practicioner", function(req, res){
    if(req.body.username && req.body.password){
        var username = req.body.username;
        var password = req.body.password;
        db.user.find({
            where : {"username" : username,
                    "password" : password}
        }).then(function(user){
            if(!user){
                res.json({
                    "error" : "User not found!"
                })
            } else {
                user.getPracticioner().then(function(practicioner){
                    var payload = {
                        "username" : user.username,
                        "practid" : practicioner.practid
                    }
                    var token = jwt.encode(payload, secret)
                    res.json({
                        "token" : token
                    })
                })
            }
        })
    } else {
       res.json({error : "please submit username and password"})
    }
})

loginRouter.post("/signup/patient", function(req, res){
    if(req.body.firstname && req.body.lastname && req.body.username && req.body.password){
        db.user.create({
            "username" : req.body.username,
            "password" : req.body.password
        }).then(function(user){
            db.patient.create({
                "firstname" : req.body.firstname,
                "lastname" : req.body.lastname,
                "email" : req.body.email
            }).then(function(patient){
                user.setPatient(patient)
                res.json({
                    "Success" : "Patient created!"
                })
            })
        })
    } else {
        res.json({
            "error" : "Please submit firstname, lastname, username and password"
        })
    }
})

loginRouter.post("/signup/practicioner", function(req, res){
    if(req.body.firstname && req.body.lastname && req.body.username && req.body.password){
        db.user.create({
            "username" : req.body.username,
            "password" : req.body.password
        }).then(function(user){
            db.practicioner.create({
                "firstname" : req.body.firstname,
                "lastname" : req.body.lastname,
                "title" : reo.body.title,
                "role" : req.body.role,
                "email" : req.body.email,
                "phone" : req.body.phone
            }).then(function(practicioner){
                user.setPracticioner(practicioner)
                res.json({
                    "Success" : "Patient created!"
                })
            })
        })
    } else {
        res.json({
            "error" : "Please submit firstname, lastname, username and password"
        })
    }
})

module.exports = loginRouter