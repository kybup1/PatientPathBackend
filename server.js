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
var loginRouter = require("./app/routers/loginRouter");
var auth = require("./app/auth");

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log("start");
app.use("/patient", auth.authenticate, patientRouter);
app.use('/appointment', auth.authenticate, appointmentRouter);
app.use('/institution', auth.authenticate, institutionRouter);
app.use('/treatmentepisode', auth.authenticate, treatmentepisodeRouter);
app.use('/', loginRouter);
app.listen(54321, function(err) {
    
});

// for testing

//Dropping and creating the Database. CARFULLY: testdata wont be loaded again
//models.sequelize.sync({force:true});

