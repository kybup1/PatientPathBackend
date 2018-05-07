var express = require("express");
var app = express();
var db = require("../models/index");
var auth = require("../auth");

var practitionerRouter = express.Router();

practitionerRouter.get("/", function(req, res) {
    var id = auth.getPractId(req.get("token"));
    db.practitioner.find({
        where : {"practid" : id}
    })
    .then(practitioner => {
        res.json(practitioner);
    });
});

practitionerRouter.get("/full", function(req, res) {
    var id = auth.getPractId(req.get("token"));
    db.practitioner.find({
        where : {"practid" : id},
        include: [{ all: true }]
    })
    .then(practitioner => {
        res.json(practitioner);
    });
});


module.exports = practitionerRouter