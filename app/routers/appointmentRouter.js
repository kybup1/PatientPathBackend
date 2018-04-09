var express = require("express");
var app = express();
var db = require("../models/index");
var auth = require("../auth");

var appointmentRouter = express.Router();

appointmentRouter.get('/', function(req, res) {
    var patid = auth.getPatId(req.get("token"));
    db.appointment.findAll({
        where : {"patid" : patid}
    }) .then(appointments => {
        res.json(appointments)
    })
})

appointmentRouter.get('/full', function(req, res) {
    var patid = auth.getPatId(req.get("token"));
    db.appointment.findAll({
        where : {"patid" : patid},
        include: [{ all: true }]
    }) .then(appointments => {
        res.json(appointments)
    })
})

appointmentRouter.get('/:id', function(req, res) {
    var patid = auth.getPatId(req.get("token"));
    var id = req.body.id;
    db.appointment.find({
        where : {'patid' : patid, 
        'aid' : id}
    }) .then(appointment => {
        res.json(appointment)
    })
})

appointmentRouter.get('/:id/full', function(req, res) {
    var patid = auth.getPatId(req.get("token"));
    var id = req.body.id;
    db.appointment.find({
        where : {'patid' : patid, 
        'aid' : id},
        include : [{all : true}]
    }) .then(appointment => {
        res.json(appointment)
    })
})

appointmentRouter.post('/', function(req, res) {
    var patid = auth.getPatId(req.get("token"));
    db.appointment.create({
        "name" : req.body.name,
        "description" : req.body.description,
        "startdate" : req.body.startdate,
        "enddate" : req.body.enddate,
        "patid" : patid,
        "episodeid": req.body.episodeid,
        "stationarycaseid" : req.body.stationarycaseid,
        "instid" : req.body.instid,
        "practid" : req.body.practid
    }).then(response => {
        res.json(response)
    })
})

appointmentRouter.put('/:id/', function(req, res){
    var id = req.params.id;
    var patid = auth.getPatId(req.get("token"));
    db.appointment.update(req.body,
        {where : {"aid":id, "patid":patid}}    
    ).then(result => res.json({
        error: false,
        message: 'updated!'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
})

appointmentRouter.delete("/:id", function(req, res){
    var id = req.params.id;
    var patid = auth.getPatId(req.get("token"));
    db.appointment.destroy({
        where:{"aid":id, "patid" : patid}
    }).then(result => res.json({
        error: false,
        message: 'deleted!'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }))
})

module.exports = appointmentRouter;