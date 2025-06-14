var express = require("express");
var rota = express.Router();

var interactionController = require('../controllers/interactionController');

rota.get('/postagens_gerais/', function (req , res) {
    interactionController.postagens_gerais(req , res);
});



rota.get('/dados_artista/:idArtista', function(req , res){
    interactionController.dados_artista(req,res);
});



rota.get('/postagens_artista/:idArtista', function (req, res) {
    interactionController.postagens_artista(req, res);
});


rota.get('/ranking_artista/', function (req, res) {
    interactionController.ranking_artista(req, res);
});


rota.get('/sentimentos_artista/:idArtista', function (req, res) {
    interactionController.sentimentos_artista(req, res);
});


rota.get('/principais_musicas/:idArtista', function(req , res){
    interactionController.principais_musicas(req , res);
});

rota.get('/postagens_sobre_artista/:idArtista', function(req , res){
    interactionController.postagens_sobre_artista(req , res);
});


rota.get('/info_perfis/', function(req , res){
    interactionController.info_perfis(req , res);
});




module.exports = rota;

