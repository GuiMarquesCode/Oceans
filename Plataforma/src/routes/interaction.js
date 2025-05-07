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

module.exports = rota;