var express = require("express");
var rota = express.Router();

var userController = require('../controllers/userController');


rota.post("/cadastrar", function(req,res){
    userController.cadastrar(req,res);
})




module.exports = rota;