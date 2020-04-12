const sequelize = require('sequelize');
const connection = require('./database');

// Model Definition
const pergunta = connection.define('pergunta', {
    titulo:{
        type: sequelize.STRING,
        allowNull: false
    },
    descricao :{
        type: sequelize.TEXT,
        allowNull: false
    }
});

pergunta.sync({force:false}).then(() => {});