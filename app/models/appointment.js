module.exports = function(sequelize, Sequelize) {
 
    var appointment = sequelize.define('appointment', {
 
        aid: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        name: {
            type: Sequelize.TEXT,
            notEmpty: true
        },

        description: {
            type: Sequelize.TEXT,
        },
 
        startdate: {
            type: Sequelize.DATE,
            notEmpty: true
        },

        enddate: {
            type: Sequelize.DATE,
        },

        patid: {
            type: Sequelize.INTEGER,
            notNull: true
        },

        instid: {
            type: Sequelize.INTEGER,
            notNull: true
        },

        practid: {
            type: Sequelize.INTEGER,
            notNull: true
        },

        episodeid: {
            type: Sequelize.INTEGER,
            notNull: true
        },

        chklstid: {
            type: Sequelize.INTEGER,
        },

        stationarycaseid: {
            type: Sequelize.INTEGER
        },

        modified: {
            type : Sequelize.BOOLEAN
        },
        olddate : {
            type : Sequelize.DATE
        },
        changerequest: {
            type : Sequelize.BOOLEAN
        }, 
        canceled: {
            type : Sequelize.BOOLEAN
        }
    });
 
    return appointment;
 
}