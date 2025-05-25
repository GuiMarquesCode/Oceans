var express = require("express");
var rota = express.Router();

var atualizarController = require('../controllers/atualizarController');


rota.get('/buscar_musica/', function (req, res) {
    atualizarController.buscar_musica(req, res);
});



rota.post('/atualizar_musica', function (req, res) {
    atualizarController.atualizar_musica(req, res);
});

module.exports = rota;