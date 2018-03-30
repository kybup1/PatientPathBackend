var express = require("express");
var app = express();
var db = require("../models/index");

var treatmentepisodeRouter = express.Router();

treatmentepisodeRouter.get("/", function(req, res){
    var patid = req.get("patid");
    db.treatmentepisode.findAll({
        where : {"patid" : patid}
    }).then (treatmentepisodes => {
        res.json(treatmentepisodes)
    })
})

treatmentepisodeRouter.get("/full", function(req, res){
    var patid = req.get("patid");
    db.treatmentepisode.findAll({
        where : {"patid" : patid},
        include : [{all:true}]
    }).then (treatmentepisodes => {
        res.json(treatmentepisodes)
    })
})

treatmentepisodeRouter.get("/:id", function(req, res){
    var id = req.params.id;
    var patid = req.get("patid");
    db.treatmentepisode.findAll({
        where : {"patid" : patid,
                "episodeid" : id}
    }).then (treatmentepisodes => {
        res.json(treatmentepisodes)
    })
})

treatmentepisodeRouter.get("/:id/full", function(req, res){
    var id = req.params.id;
    var patid = req.get("patid");
    db.treatmentepisode.findAll({
        where : {"patid" : patid,
                "episodeid" : id},
                include : [{all : true}]
    }).then (treatmentepisodes => {
        res.json(treatmentepisodes)
    })
})

treatmentepisodeRouter.post("/", function(req, res){
    db.treatmentepisode.create({
        "name" : req.body.name,
        "patid" : req.get("patid")
    }).then(result => res.json({
        error: false,
        message: 'created!'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
})

treatmentepisodeRouter.put("/:id", function(req, res){
    var id = req.params.id;
    db.treatmentepisode.update(req.body)
    .then(result => res.json({
        error: false,
        message: 'updated!'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
})

treatmentepisodeRouter.delete("/:id", function(req, res){
    var id = req.params.id;
    db.treatmentepisode.destroy({
        where : {"episodeid" : id}
    }).then(result => res.json({
        error: false,
        message: 'deleted!'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
})

module.exports = treatmentepisodeRouter