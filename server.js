var express = require('express');
var app = express();

var bodyParser = require('body-parser')
var env = require('dotenv').load();
var cors = require('cors');
var models = require("./app/models");
var db = require("./app/models/index");
var patientRouter = require("./app/routers/patientRouter");
var practitionerRouter = require("./app/routers/practitionerRouter");
var appointmentRouter = require("./app/routers/appointmentrouter");
var institutionRouter = require("./app/routers/institutionRouter");
var treatmentepisodeRouter = require("./app/routers/treatmentepisodeRouter");
var stationarycaseRouter = require("./app/routers/stationarycaseRouter");
var loginRouter = require("./app/routers/loginRouter");
var checklistRouter = require("./app/routers/checklistRouter");
var auth = require("./app/auth");
var hl7parser = require("./app/interface/hl7v2_SIU/hl7parser");
var schedule = require('node-schedule');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log("PatientPath backend started successfully!");

//Adding cors support to the REST API
app.use(cors());

//Adding the different routers to their corresponding url.
//Adding the authenticate method to each router that has restricted access
app.use("/patient", auth.authenticate, patientRouter);
app.use("/practitioner", auth.authenticate, practitionerRouter);
app.use('/appointment', auth.authenticate, appointmentRouter);
app.use('/institution', auth.authenticate, institutionRouter);
app.use('/treatmentepisode', auth.authenticate, treatmentepisodeRouter);
app.use('/stationarycase', auth.authenticate, stationarycaseRouter);
app.use("/checklist", auth.authenticate, checklistRouter);
app.use('/', loginRouter);

//Starting the server on port 1234
app.listen(1234, function(err) {
    
});


// Every 15 seconds the hl7parser will execute
var j = schedule.scheduleJob('*/30 * * * * *', function(){
    try {
        hl7parser.readHL7Messages();
    } catch (error) {
        console.log(error);
    }
    
});


// for testing

//Dropping and creating the Database. CARFULLY: testdata wont be loaded again
//models.sequelize.sync({force:true});

// db.institution.create({
//     "name" : "Praxis Dr. Wenger",
//     "Description" : "Hausarztpraxis von Dr. Wenger",
//     "address" : "Höheweg 80, 2502 Biel",
//     "category" : "Hausarzt",
//     "phone" : "035 684 15 65"
// }).then(function(institution){
//     db.practitioner.create({
//         "firstname" : "Hans",
//         "lastname" : "Wenger",
//         "title" : "Dr. med",
//         "role" : "Hausarzt",
//         "phone" : "068 8987 898498",
//         "email" : "drwenger@bluwin.ch"
//     }).then(function(practitioner){
//         practitioner.setInstitution(institution);
//     })
// });

// db.institution.create({
//     "name" : "Klinik Höheweg",
//     "Description" : "Spital am Höheweg in Biel",
//     "address" : "Höheweg 80, 2502 Biel",
//     "category" : "Spital",
//     "phone" : "068 844 89 65",
//     "email" : "info@klinikhoeheweg.ch"
// }).then(function(institution){
//     db.practitioner.create({
//         "firstname" : "Hüft",
//         "lastname" : "Raus",
//         "title" : "Dr. med",
//         "role" : "Chirurg",
//         "phone" : "098 8987 456 4565",
//     }).then(function(practitioner){
//         practitioner.setInstitution(institution);
//     })
// });



