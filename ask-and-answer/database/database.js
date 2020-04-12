const sequelize = require('sequelize');

const connection = new sequelize('guia_perguntas','root','cogumelo10@A', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;