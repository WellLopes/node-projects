const Sequelize = require('sequelize');
const connection = new Sequelize('guiapress','root','cogumelo10@A',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;