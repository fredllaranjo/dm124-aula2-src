const Sequelize = require('sequelize');
const sequelize = new Sequelize('app-database', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;