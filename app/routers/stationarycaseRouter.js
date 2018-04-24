var express = require("express");
var app = express();
var db = require("../models/index");
var auth = require("../auth");

var stationarycaseRouter = express.Router();

stationarycaseRouter.get("/", function(req, res){
    var patid = auth.getPatId(req.get("token"));
    db.stationarycase.findAll({
        where : {"patid" : patid},
        order : ['startdate']
    }).then (stationarycase => {
        res.json(stationarycase)
    })
})

stationarycaseRouter.get("/full", function(req, res){
    var patid = auth.getPatId(req.get("token"));
    db.stationarycase.findAll({
        where : {"patid" : patid},
        order : ['startdate'],
        include : [{all:true}]
    }).then (stationarycase => {
        res.json(stationarycase)
    })
})

stationarycaseRouter.get("/:id", function(req, res){
    var id = req.params.id;
    var patid = auth.getPatId(req.get("token"));
    db.stationarycase.findAll({
        where : {"patid" : patid,
                "caseid" : id}
    }).then (stationarycase => {
        res.json(stationarycase)
    })
})

stationarycaseRouter.get("/:id/full", function(req, res){
    var id = req.params.id;
    var patid = auth.getPatId(req.get("token"));
    db.stationarycase.findAll({
        where : {"patid" : patid,
                "caseid" : id},
                include : [{all : true}]
    }).then (stationarycase => {
        res.json(stationarycase)
    })
})

stationarycaseRouter.post("/", function(req, res){
    var patid = auth.getPatId(req.get("token"));
    var instid = req.body.instid || req.get("instid");
    if(!instid){
        res.json({
            "error": "please send the instid field with the id of the coresponding institution"
        })
    }
    var episodeid = req.body.episodeid || req.get("episodeid");
    if(!episodeid){
        res.json({
            "error": "please send the episodeid field with the id of the coresponding treatmentepisode"
        })
    }
    db.stationarycase.create({
        "name" : req.body.name,
        "description" : req.body.description,
        "patid" : patid,
        "instid" : instid,
        "episodeid" : episodeid,
        "startdate" : req.body.startdate,
        "enddate" : req.body.enddate,
    }).then(result => res.json({
        error: false,
        message: 'created!'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
})

stationarycaseRouter.put("/:id", function(req, res){
    var id = req.params.id;
    var patid = auth.getPatId(req.get("token"));
    db.stationarycase.update(req.body, 
        {where:{"caseid":id, "patid" : patid}}
    ).then(result => res.json({
        error: false,
        message: 'updated!'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
})

stationarycaseRouter.delete("/:id", function(req, res){
    var id = req.params.id;
    var patid = auth.getPatId(req.get("token"));
    db.stationarycase.destroy({
        where : {"caseid" : id, "patid" : patid}
    }).then(result => res.json({
        error: false,
        message: 'deleted!'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
})

module.exports = stationarycaseRouter