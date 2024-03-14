const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('microservicios', 'root', 'root1234', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;