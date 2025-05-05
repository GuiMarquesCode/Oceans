var express = require("express");
var rota = express.Router();

var interactionController = require('../controllers/interactionController');

rota.get('/postagens_gerais/', function (req , res) {
    interactionController.postagens_gerais(req , res);
});


module.exports = rota;