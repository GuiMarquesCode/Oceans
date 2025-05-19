var dash_userModels = require("../models/dash_userModels");


function sentimento(req , res){
    var  idUsuario = req.params.idUsuario;

    dash_userModels.sentimento(idUsuario).then(function(resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhuma postagem encontrada!")
        }
    })
}

function qtd_Postagem(req , res){
    var  idUsuario = req.params.idUsuario;

    dash_userModels.qtd_Postagem(idUsuario).then(function(resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhuma postagem encontrada!")
        }
    })
}


function melhor_artista(req , res){
    var  idUsuario = req.params.idUsuario;

    dash_userModels.melhor_artista(idUsuario).then(function(resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhuma postagem encontrada!")
        }
    })
}




module.exports = {
    sentimento,
    qtd_Postagem,
    melhor_artista
}