const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //Ctach informations forms
const connection = require('./database/database');
const perguntaModel = require('./database/Ask'); //import code to catch database information

//DataBase
connection
    .authenticate()
    .then(() => {
        console.log('Connection done!');
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// Use EJS like engine (HTML)
app.set('view engine','ejs');
app.use(express.static('public'));

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.get('/',(req, res) => {
   res.render('index');
});

app.get('/perguntar',(req, res) => {
    res.render('perguntar');
});

app.post('/saveanswer', (req, res) => {
    let tittle = req.body.tittle;
    let description = req.body.description;
    res.send(`Forms get! Title: ${tittle}. Description: ${description}`);
});

app.listen(8080, () => {
    console.log('App rodando!')
});