"use strict";
 
var Sequelize = require("sequelize");
var config = require('../config/dbconfig.json');
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var path = "./";
var db = {};
 
db.sequelize = sequelize;
db.Sequelize = Sequelize;
 
//import of the different entities in the database
db.user = require(path +'user.js')(sequelize, Sequelize);
db.patient = require(path + 'patient.js')(sequelize, Sequelize);
db.treatmentepisode = require(path +'treatmentepisode.js')(sequelize, Sequelize);
db.institution = require(path +'institution.js')(sequelize, Sequelize);
db.practitioner = require(path +'practitioner.js')(sequelize, Sequelize);
db.checklist = require(path +'checklist.js')(sequelize, Sequelize);
db.checklistitem = require(path +'checklistitem.js')(sequelize, Sequelize);
db.treatmentepisode = require(path +'treatmentepisode.js')(sequelize, Sequelize);
db.appointment = require(path + 'appointment.js')(sequelize, Sequelize);
db.stationarycase = require(path + 'stationarycase.js')(sequelize, Sequelize);

//Definition of the associations in the database
db.patient.hasMany(db.appointment, { foreignKey: 'patid' });
db.appointment.belongsTo(db.patient, { foreignKey: 'patid' });

db.patient.hasMany(db.treatmentepisode, { foreignKey: 'patid' });
db.treatmentepisode.belongsTo(db.patient, { foreignKey: 'patid' });

db.patient.hasMany(db.stationarycase, { foreignKey: 'patid' });
db.stationarycase.belongsTo(db.patient, { foreignKey: 'patid' });

db.stationarycase.belongsTo(db.treatmentepisode, { foreignKey: 'episodeid' });
db.treatmentepisode.hasMany(db.stationarycase, { foreignKey: 'episodeid' });

db.appointment.belongsTo(db.stationarycase, { foreignKey: 'caseid' });
db.stationarycase.hasMany(db.appointment, { foreignKey: 'caseid' });

db.appointment.belongsTo(db.treatmentepisode, { foreignKey: 'episodeid' });
db.treatmentepisode.hasMany(db.appointment, { foreignKey: 'episodeid' });

db.appointment.belongsTo(db.institution, { foreignKey: 'instid' });
db.institution.hasMany(db.appointment, { foreignKey: 'instid' });

db.practitioner.hasMany(db.appointment, { foreignKey: 'practid' });
db.appointment.belongsTo(db.practitioner, { foreignKey: 'practid' });

db.checklist.hasOne(db.appointment, { foreignKey: 'chklstid' });
db.appointment.belongsTo(db.checklist, { foreignKey: 'chklstid' });

db.checklist.hasMany(db.checklistitem, { foreignKey: 'chklstid' });
db.checklistitem.belongsTo(db.checklist, { foreignKey: 'chklstid' });

db.institution.hasMany(db.practitioner, { foreignKey: 'instid' });
db.practitioner.belongsTo(db.institution, { foreignKey: 'instid' });

db.institution.hasMany(db.stationarycase, { foreignKey: 'instid' });
db.stationarycase.belongsTo(db.institution, { foreignKey: 'instid' });

db.patient.hasOne(db.user, {foreignKey : "patid"});
db.user.belongsTo(db.patient, {foreignKey: "patid"});

db.practitioner.hasOne(db.user, {foreignKey : "practid"});
db.user.belongsTo(db.practitioner, {foreignKey : "practid"});

module.exports = db;