var atualizarModels = require("../models/atualizarModels");


function buscar_musica(req, res) {


    atualizarModels.buscar_musica().then(function (resultado) {
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


function atualizar_musica(req, res) {


    var nova_preview = req.body.nova_previewServer;
    var idMusica = req.body.idMusicaServer;


    atualizarModels.atualizar_musica(idMusica,nova_preview)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );

}


module.exports = {
    buscar_musica,
    atualizar_musica
}