module.exports = function(sequelize, Sequelize) {
 
    var checklistitem = sequelize.define('checklistitem', {
 
        chklstitemid: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        checked: {
            type: Sequelize.BOOLEAN
        },
 
        chklstid: {
            type: Sequelize.INTEGER,
            notNull: true
        }
    });
 
    return checklistitem;
 
}