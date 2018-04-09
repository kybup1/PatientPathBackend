module.exports = function(sequelize, Sequelize) {
 
    var stationarycase = sequelize.define('stationarycase', {
 
        caseid: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        description: {
            type: Sequelize.STRING
        },

        startdate: {
            type: Sequelize.DATE
        },

        enddate: {
            type: Sequelize.DATE
        },

        patid: {
            type: Sequelize.INTEGER,
            notNull: true
        },

        episodeid: {
            type: Sequelize.INTEGER,
            notNull: true
        },

        instid: {
            type: Sequelize.INTEGER,
            notNull: true
        },
        
        externalcaseid: {
            type: Sequelize.INTEGER
        }
 
    });
 
    return stationarycase;
 
}