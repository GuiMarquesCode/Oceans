var express = require("express");
var rota = express.Router();

var musicController = require('../controllers/musicController');


rota.post("/cadastrar", function(req,res){
    musicController.cadastrar(req,res);
})




module.exports = rota;