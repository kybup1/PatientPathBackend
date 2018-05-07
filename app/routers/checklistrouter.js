var express = require("express");
var app = express();
var db = require("../models/index");

var checklistRouter = express.Router();

checklistRouter.get('/:id', function(req, res) {
    var id = req.params.id;
    console.log(id)
    db.checklist.find({
        where : {"chklstid" : id},
        include : [{all : true}]
    }).then(function(checklist) {
        res.json(checklist);
    })

})

checklistRouter.post("/", function(req, res){
    var aid = req.get("aid") || req.body.aid;
    if(!aid){
        res.json({
            "Error" : "Please submit appointmentid as aid in header or body"
        })
    }
    db.checklist.create({
        "name" : req.body.name
    })
    .then(function(checklist){
        db.appointment.find({
            where : {"aid" : aid}
        }).then(function(appointment){
            appointment.setChecklist(checklist)
        })
        res.json(checklist)
    }) 
})

checklistRouter.post("/:id/additem", function(req, res){
    var id = req.params.id;
    db.checklistitem.create({
        "name" : req.body.name,
        "chklstid" : id
    }).then(function(chklstitem){
        res.json(chklstitem)
    })
})

checklistRouter.delete("/:id/removeitem/", function(req, res){
    var id = req.params.id;
    db.checklistitem.destroy({
        where : {"chklstid" : id, "name" : req.body.name}
    }).then(function(response){
        res.json({
            "error" : "false"
        })
    })
})

module.exports = checklistRouter