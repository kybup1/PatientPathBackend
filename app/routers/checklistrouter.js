var express = require("express");
var app = express();
var db = require("../models/index");

//This file contains all the functions for the API requests to read and manipulate checklists and checklistitems in the Database


var checklistRouter = express.Router();

checklistRouter.get('/:id', function(req, res) {
    var id = req.params.id;
    db.checklist.find({
        where : {"chklstid" : id},
        include : [{all : true}]
    }).then(function(checklist) {
        res.json(checklist);
    })

})

checklistRouter.delete('/:id', function(req, res) {
    var id = req.params.id;
    //Deletes the checklist with all linked checklistitems
    db.checklist.destroy({
        where : {"chklstid" : id},
        include: [{
            model: db.checklistitem,
            where: { "chklstid": id }
        }]
    })
})

checklistRouter.get('/:id/changeitem', function(req, res){
    var id = req.params.id;
    db.checklistitem.find({
        where : {"chklstitemid" : id}
    }).then(checklistitem => {
        checklistitem.checked = !checklistitem.checked;
        checklistitem.save()
        return checklistitem
    })
    .then(function(cheklistitem){
        res.json(cheklistitem)
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

checklistRouter.post("/:id/additem/", function(req, res){
    var id = req.params.id;
    db.checklistitem.create({
        "name" : req.body.name,
        "chklstid" : id,
        "checked" : false
    }).then(function(chklstitem){
        res.json(chklstitem)
    })
})

checklistRouter.delete("/removeitem/:id", function(req, res){
    var id = req.params.id;
    db.checklistitem.destroy({
        where : {"chklstitemid" : id}
    }).then(function(response){
        res.json({
            "error" : "false"
        })
    })
})

module.exports = checklistRouter