var express = require("express");
var app = express();
var db = require("../models/index");

var patientRouter = express.Router();

patientRouter.get("/", function(req, res) {
    db.patient.findAll()
    .then(patients => {
        res.json(patients)
    })
});

patientRouter.get("/:id", function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.patient.find({
        where : {"patid" : id}
    })
    .then(patient => {
        res.json(patient);
    });
});

patientRouter.get("/:id/full", function(req, res) {
    var id = req.params.id;
    db.patient.find({
        where : {"patid" : id},
        include: [{ all: true }]
    })
    .then(patient => {
        res.json(patient);
    });
});

module.exports = patientRouter