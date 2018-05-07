module.exports = function(sequelize, Sequelize) {
 
    var practitioner = sequelize.define('practitioner', {
 
        practid: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        title: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        role: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        phone: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        
        instid: {
            type: Sequelize.INTEGER,
            notNull: true
        }
    });
 
    return practitioner;
 
}