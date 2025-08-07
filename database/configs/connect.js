const Sequelize = require('sequelize');
const dbConf = require('./dbConfigAcess.js');
const connection = new Sequelize(
    dbConf.database,
    dbConf.username,
    dbConf.password,
    dbConf.params
);

module.exports = connection