module.exports = function(sequelize, Sequelize) {
 
    var institution = sequelize.define('institution', {
 
        instid: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        description: {
            type: Sequelize.STRING,
        },

        address: {
            type: Sequelize.STRING,
        },

        category: {
            type: Sequelize.STRING,
        },

        phone: {
            type: Sequelize.STRING,
        },
 
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        } 
    });
 
    return institution;
 
}