var express = require("express");
var app = express();
var db = require("../models/index");
var auth = require("../auth");
const Op = db.Sequelize.Op;

//This file contains all the functions for the API request to read and manipulate appointments in the Database

var appointmentRouter = express.Router();

appointmentRouter.get('/', function(req, res) {
    var patid = auth.getPatId(req.get("token")) || req.get("patid");
    var practid = auth.getPractId(req.get("token"));
    //Depending if a practitioner or a patient sends the request a different function is executed
    if(practid != null){
        db.appointment.findAll({
            where : {
                "practid" : practid,
                "canceled" : false
            }, 
            order : ['startdate']
        }) .then(appointments => {
            res.json(appointments)
        })
    } else {
        db.appointment.findAll({
            where : {
                "patid" : patid,
                "canceled" : false,

            }, 
            order : ['startdate']
        }) .then(appointments => {
            res.json(appointments)
        })
    }
})

appointmentRouter.get('/full', function(req, res) {
    var patid = auth.getPatId(req.get("token"));
    var practid = auth.getPractId(req.get("token"));
    if(practid != null){
        db.appointment.findAll({
            where : {
                "practid" : practid,
                "canceled" : false
            }, 
            order : ['startdate'],
            include : [{all : true}]
        }) .then(appointments => {
            res.json(appointments)
        })
    } else {
        db.appointment.findAll({
            where : {
                "patid" : patid,
                "canceled" : false
            }, 
            order : ['startdate'],
            include : [{all : true}]
        }) .then(appointments => {
            res.json(appointments)
        })
    }
})

appointmentRouter.get('/:id', function(req, res) {
    var patid = auth.getPatId(req.get("token"));
    var id = req.params.id;
    db.appointment.find({
        where : {'patid' : patid,
        "canceled" : false, 
        'aid' : id}
    }) .then(appointment => {
        res.json(appointment)
    })
})

appointmentRouter.get('/:id/full', function(req, res) {
    var patid = auth.getPatId(req.get("token"));
    var id = req.params.id;
    db.appointment.find({
        where : {'patid' : patid,
        "canceled" : false, 
        'aid' : id},
        include : [{all : true}]
    }) .then(appointment => {
        res.json(appointment)
    })
})

appointmentRouter.post('/', function(req, res) {
    var patid = auth.getPatId(req.get("token")) || req.body.patid;
    var practid = auth.getPractId(req.get("token")) || req.body.practid;
    db.appointment.create({
        "name" : req.body.name,
        "description" : req.body.description,
        "startdate" : req.body.startdate,
        "enddate" : req.body.enddate,
        "patid" : patid,
        "episodeid": req.body.episodeid,
        "stationarycaseid" : req.body.stationarycaseid,
        "instid" : req.body.instid,
        "practid" : practid,
        "modified" : true,
        "changerequest" : false
    }).then(response => {
        res.json(response)
    })
})

appointmentRouter.put('/:id/', function(req, res){
    var id = req.params.id;
    
    var patid = auth.getPatId(req.get("token")) || req.body.patid;
    var practid = auth.getPractId(req.get("token")) || req.body.practid;
    db.appointment.find({
        where : {"aid":id, "patid":patid}
    }).then(appointment => {
        req.body.olddate = appointment.startdate
    }).then(result => {
        db.appointment.update(req.body,
            {where : {"aid":id, "patid":patid}}  
        )
    })
    .then(result => res.json({
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
    var patid = auth.getPatId(req.get("token")) || req.body.patid;
    var practid = auth.getPractId(req.get("token")) || req.body.practid;
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

appointmentRouter.get("/:id/changenoticed", function(req, res){
    var patid = auth.getPatId(req.get("token"));
    var id = req.params.id;
    db.appointment.find({
        where : {"patid" : patid, "aid" : id}
    }).then(appointment => {
        console.log(appointment.modified)
        if(appointment.modified == true){
            appointment.modified = false;
            appointment.save()
            res.json({
                "error" : "false",
                "cmessage" : "change noticed"
            })
        } else {
            res.json({
                "error" : "true",
                "message" : "appointment has no recent changes"
            })
        }
    })
})

module.exports = appointmentRouter;