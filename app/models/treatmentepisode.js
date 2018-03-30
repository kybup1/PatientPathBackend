module.exports = function(sequelize, Sequelize) {
 
    var treatmentepisode = sequelize.define('treatmentepisode', {
 
        episodeid: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        patid: {
            type: Sequelize.INTEGER,
            notNull: true
        },
 
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        }
 
    });
 
    return treatmentepisode;
 
}