var express = require("express");
var rota = express.Router();
const fetch = require('node-fetch'); 
var musicController = require('../controllers/musicController');


rota.post("/cadastrar", function(req,res){
    musicController.cadastrar(req,res);
})

rota.get('/pesquisar', async (req, res) => {
    const { q } = req.query;

    try {
        const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(q)}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Erro ao buscar dados da Deezer:", error);
        res.status(500).json({ erro: "Erro ao consultar a Deezer" });
    }
});

rota.get('/pesquisar2/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await fetch(`https://api.deezer.com/track/${encodeURIComponent(id)}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Erro ao buscar dados da Deezer:", error);
        res.status(500).json({ erro: "Erro ao consultar a Deezer" });
    }
});

rota.get('/pesquisar_dados_artista/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await fetch(`https://api.deezer.com/artist/${encodeURIComponent(id)}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Erro ao buscar dados da Deezer:", error);
        res.status(500).json({ erro: "Erro ao consultar a Deezer" });
    }
});

rota.get('/pesquisar_musica_artista/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await fetch(`https://api.deezer.com/artist/${encodeURIComponent(id)}/top?limit=20`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Erro ao buscar dados da Deezer:", error);
        res.status(500).json({ erro: "Erro ao consultar a Deezer" });
    }
});

rota.get('/postagens/:idusuario', function (req, res) {
    musicController.postagens(req, res);
});

rota.delete('/excluir_postagem/:id_post', function (req, res) {
    musicController.excluir_postagem(req, res);
});



module.exports = rota;