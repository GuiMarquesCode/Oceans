var interactionModels = require("../models/interactionModels");


function postagens_gerais(req ,res) {
    var idUsuario = req.params.idusuario;   

    interactionModels.postagens_gerais(idUsuario).then(function (resultado) {
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
    postagens_gerais
}