var express = require("express");
var app = express();
var db = require("../models/index");
var jwt = require("jwt-simple");

var loginRouter = express.Router();

//In this file contains the different functions for the login and signup requests

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

loginRouter.post("/login/practitioner", function(req, res){
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
                user.getPractitioner().then(function(practitioner){
                    var payload = {
                        "username" : user.username,
                        "practid" : practitioner.practid
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
    if(req.body.firstname && req.body.lastname && req.body.birthdate && req.body.username && req.body.password){
        db.user.create({
            "username" : req.body.username,
            "password" : req.body.password
        }).then(function(user){
            db.patient.create({
                "firstname" : req.body.firstname,
                "lastname" : req.body.lastname,
                "birthdate" : req.body.birthdate,
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

loginRouter.post("/signup/practitioner", function(req, res){
    if(req.body.firstname && req.body.lastname && req.body.username && req.body.password){
        db.user.create({
            "username" : req.body.username,
            "password" : req.body.password
        }).then(function(user){
            db.practitioner.create({
                "firstname" : req.body.firstname,
                "lastname" : req.body.lastname,
                "title" : reo.body.title,
                "role" : req.body.role,
                "email" : req.body.email,
                "phone" : req.body.phone
            }).then(function(practitioner){
                user.setpractitioner(practitioner)
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