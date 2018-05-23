//console.log("hello word");

var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/minicurso');

const Serie = require('./Serie.js');

var app = express();
app.use(bodyParser.json());

var series = [];

//quando alguem fizer uma requisicao get eu irei executar essa funcao
app.get('/', function(requisicao, resposta){
    console.log('deu certo');
    resposta.send('<h1>Bem Vindo ao NodeFlix!</h1>');
});

//function(requisicao, resposta) == (req, res)=>
app.post('/series', (req, res)=>{
    var novaSerie = req.body;
    const serieCriada = new Serie(novaSerie);
    serieCriada.save(function(){
        res.status(201).send(serieCriada);
    });
});

app.get('/series/:id', (req, res)=>{
    const seriesDB = Serie.findById(req.params.id, (erro, serie)=>{
       if(erro){
           res.status(400).send(erro);
       }

       res.send(serie);
    });
});

app.get('/series', (req, res)=>{
    const seriesDB = Serie.find({}, '_id nome', (erro, series)=>{
       if(erro){
           return res.status(400).send(erro);
       }
       
       res.send(series);
    });
});

app.put('/series/:id', (req, res)=>{
    var id = req.params.id;
    var novasSeries = req.body;

    for (var serie of series){
        if (serie.id === id){
            serie.assistida = novaSerie.assistida;
        }
    }

    res.send(series);
});

app.put('/series/:id', (req, res)=>{
    var id = req.params.id;
    var novaSerie = req.body;

    Serie.findById(id, (err, serieEncontrada)=>{
        serieEncontrada.assistida = novaSerie.assistida;
        serieEncontrada.save((err, save)=>{
            res.send(serie);
        });
    });

});

app.listen(8087, function(){
    console.log('O servidor esta rodando');
});