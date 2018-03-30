module.exports = function(sequelize, Sequelize) {
 
    var checklist = sequelize.define('checklist', {
 
        chklstid: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        }

    });
 
    return checklist;
 
}