var express = require("express");
var rota = express.Router();

var dash_userController = require('../controllers/dash_userController');

rota.get('/sentimento/:idUsuario', function (req, res) {
    dash_userController.sentimento(req, res);
});


rota.get('/qtd_Postagem/:idUsuario', function (req, res) {
    dash_userController.qtd_Postagem(req, res);
});


rota.get('/melhor_artista/:idUsuario', function (req, res) {
    dash_userController.melhor_artista(req, res);
});

rota.get('/indicacao_artista/:Sentimento', function (req, res) {
    dash_userController.indicacao_artista(req, res);
});

module.exports = rota;