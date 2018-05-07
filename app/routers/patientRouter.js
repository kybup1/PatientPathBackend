var express = require("express");
var app = express();
var db = require("../models/index");
var auth = require("../auth");

var patientRouter = express.Router();

patientRouter.get("/", function(req, res) {
    var id = auth.getPatId(req.get("token"));
    db.patient.find({
        where : {"patid" : id}
    })
    .then(patient => {
        res.json(patient);
    });
});

patientRouter.get("/full", function(req, res) {
    var id = auth.getPatId(req.get("token"));
    db.patient.find({
        where : {"patid" : id},
        include: [{ all: true }]
    })
    .then(patient => {
        res.json(patient);
    });
});

patientRouter.get("/all", function(req, res){
    if(auth.getPractId(req.get("token")) != null){
        db.patient.findAll()
        .then(patients => {
            res.json(patients)
        })
    } else {
        res.json({
            error : true,
            message : "Only available for practitioners"
        })
    }
})

module.exports = patientRouter