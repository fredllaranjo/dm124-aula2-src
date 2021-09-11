const Sequelize = require('sequelize');
const sequelize = require('../database/QuestionsSequelize');
const Option = sequelize.define('option', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    option: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
module.exports = Option;