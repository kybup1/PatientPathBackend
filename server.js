var express = require('express');
var app = express();
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
var env = require('dotenv').load();
var models = require("./app/models");
var db = require("./app/models/index");
var patientRouter = require("./app/routers/patientRouter");
var appointmentRouter = require("./app/routers/appointmentrouter");
var institutionRouter = require("./app/routers/institutionRouter");
var treatmentepisodeRouter = require("./app/routers/treatmentepisodeRouter");

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log("start");
app.use("/patient", patientRouter);
app.use('/appointment', appointmentRouter);
app.use('/institution', institutionRouter);
app.use('/treatmentepisode', treatmentepisodeRouter)

app.listen(54321, function(err) {
    
});

// for testing

//Dropping and creating the Database. CARFULLY: testdata wont be loaded again
//models.sequelize.sync({force:true});

