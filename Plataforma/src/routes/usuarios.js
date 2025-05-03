var express = require("express");
var rota = express.Router();

var userController = require('../controllers/userController');

rota.post("/deletar", function(req,res){
    userController.deletar(req,res);
})


rota.post("/atualizar", function(req,res){
    userController.atualizar(req,res);
})

rota.post("/cadastrar", function(req,res){
    userController.cadastrar(req,res);
})

rota.post("/autenticar", function (req, res) {
    userController.autenticar(req, res);
});



module.exports = rota;