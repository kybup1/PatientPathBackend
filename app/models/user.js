module.exports = function(sequelize, Sequelize) {
 
    var user = sequelize.define('user', {
 
        userid: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        username: {
            type: Sequelize.STRING
        },
 
        password: {
            type: Sequelize.STRING,
            notNull: true
        },

        token: {
            type: Sequelize.STRING,
        },
 
        last_activity: {
            type: Sequelize.DATE
        },
        foreignid :{
            type: Sequelize.INTEGER,
        }
 
    });
 
    return user;
 
}