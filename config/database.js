const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'postgres', 'admin', {
  host: 'localhost',
  port: '5000',
  dialect: 'postgres',
});

module.exports = sequelize;