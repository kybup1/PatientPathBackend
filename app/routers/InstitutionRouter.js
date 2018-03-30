var express = require("express");
var app = express();
var db = require("../models/index");

var institutionRouter = express.Router();

institutionRouter.get("/", function(req, res){
    db.institution.findAll({

    }).then(institutions => {
        res.json(institutions)
    })
})

institutionRouter.get("/:id", function(req, res){
    var id = req.params.id;
    db.institution.find({
        where : {"instid" : id}
    }).then(institution =>{
        res.json(institution)
    })
})

institutionRouter.post("/", function(req, res){
    db.institution.create(req.body)
    .then(result => res.json({
        error: false,
        message: 'Created!'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
})

institutionRouter.put("/:id", function(req, res){
    var id = req.params.id;
    db.institution.update(req.body,{
        where : {"instid" : id}
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

institutionRouter.delete("/:id", function(req, res){
    var id = req.params.id;
    db.institution.destroy({
        where : {"instid" : id}
    }).then(result => res.json({
        error: false,
        message: 'deleted!'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
})

module.exports = institutionRouter