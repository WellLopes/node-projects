const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //Ctach informations forms
const connection = require('./database/database');
const pergunta = require('./database/Ask'); //import code to catch database information
const Resposta = require('./database/Resposta');

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
    pergunta.findAll({ raw: true, order:[ //findAll: all information on db || //raw: search only "relevante" informations || // order: order our array of ask on decreasing way
        ['id','DESC']
    ]}).then(pergunta => {
        res.render('index',{
            pergunta: pergunta
        });
    });
});

app.get('/perguntar',(req, res) => {
    res.render('perguntar');
});

app.post('/saveanswer', (req, res) => {
    //Receive forms information
    let titulo = req.body.titulo; // save them into this variables
    let descricao = req.body.descricao;
    
    //Insert information into our database
    pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => { //if okay, redirect to first page
        res.redirect('/');
    });
});

app.get('/pergunta/:id', (req, res) => { //Search on db specific claimed id and show me
    const id = req.params.id;
    pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ //answer finded
            
            Resposta.findAll({ //show answer allready write and show them with the same solicitation ask
                where: { perguntaId: pergunta.id },
                order: [ 
                    ['id','DESC'] 
                ]
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                });    
            });
        }else{  //answer not found
            res.redirect('/');
        }
    })
});

app.post('/responder', (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect(`/pergunta/${perguntaId}`)
    });
});

app.listen(8080, () => {
    console.log('App rodando!')
});