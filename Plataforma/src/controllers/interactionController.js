var interactionModels = require("../models/interactionModels");


function dados_artista(req, res) {
    var idArtista = req.params.idArtista;

    interactionModels.dados_artista(idArtista).then(function (resultado) {
        if (resultado.length > 0) {
            res.json(200).json(resultado);
        } else {
            res.status(204).send("Nenhuma postagem encontrada!")
        }
    })
}

function postagens_gerais(req, res) {
    var idUsuario = req.params.idusuario;

    interactionModels.postagens_gerais(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.status(204).send("Nenhuma postagem encontrada!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as postagens.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function postagens_artista(req, res) {

    var idArtista = req.params.idArtista;

    interactionModels.postagens_artista(idArtista).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhuma postagem encontrada!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as postagens.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function ranking_artista(req, res) {

    var idUsuario = req.params.idusuario;

    interactionModels.ranking_artista(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhuma postagem encontrada!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as postagens.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function principais_musicas(req, res) {

    var idArtista = req.params.idArtista;

    interactionModels.principais_musicas(idArtista).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhuma postagem encontrada!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as postagens.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function sentimentos_artista (req, res) {

    var idArtista = req.params.idArtista;

    interactionModels.sentimentos_artista(idArtista).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhuma postagem encontrada!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as postagens.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function postagens_sobre_artista (req, res) {

    var idArtista = req.params.idArtista;

    interactionModels.postagens_sobre_artista(idArtista).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhuma postagem encontrada!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as postagens.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



module.exports = {
    dados_artista,
    sentimentos_artista,
    postagens_artista,
    postagens_gerais,
    ranking_artista,
    principais_musicas,
    postagens_sobre_artista
}