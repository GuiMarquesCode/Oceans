var musicModel = require("../models/musicModels");

function postagens(req, res) {

    var idUsuario = req.params.idusuario;   

    musicModel.postagens(idUsuario).then(function (resultado) {
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

function postagens_gerais( res) {

    musicModel.postagens().then(function (resultado) {
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


function cadastrar(req, res) {
    var sentimento = req.body.sentimentoServer;
    var historia = req.body.historiaServer;
    var idMusica = req.body.idMusicaServer;
    var idArtista = req.body.idArtistaServer;
    var artista = req.body.Nome_artistaServer;
    var Titulo = req.body.tituloServer
    var Preview = req.body.Preview_MusicaServer
    var Foto_artista = req.body.Foto_artistaServer;
    var Titulo_Album = req.body.Titulo_AlbumServer;
    var Data_Lancamento = req.body.Data_LancamentoServer;
    var Foto_Album = req.body.Foto_AlbumServer;
    var idAlbum = req.body.idAlbumServer;
    var idUser = req.body.idUserServer;

    if (sentimento == undefined) {
        res.status(400).send("O sentimento está undefined!");
    } else if (historia == undefined) {
        res.status(400).send("A história está undefined!");
    } else if (idMusica == undefined) {
        res.status(400).send("O ID da música está undefined!");
    } else if (idArtista == undefined) {
        res.status(400).send("O ID do artista está undefined!");
    } else if (artista == undefined) {
        res.status(400).send("O nome do artista está undefined!");
    } else if (Foto_artista == undefined) {
        res.status(400).send("A foto do artista está undefined!");
    } else if (Titulo_Album == undefined) {
        res.status(400).send("O título do álbum está undefined!");
    } else if (Data_Lancamento == undefined) {
        res.status(400).send("A data de lançamento está undefined!");
    } else if (Foto_Album == undefined) {
        res.status(400).send("A foto do álbum está undefined!");
    } else if (idAlbum == undefined) {
        res.status(400).send("O ID do álbum está undefined!");
    } else if (idUser == undefined) {
        res.status(400).send("O ID do usuário está undefined!");
    } else if (Titulo == undefined) {
        res.status(400).send("O Titulo está undefined!");
    }
    else if (Preview == undefined) {
        res.status(400).send("O Preview está undefined!");
    }
    else {
        musicModel.cadastrar(sentimento, historia, idMusica, idArtista, artista, Foto_artista, Titulo_Album, Data_Lancamento, Foto_Album, idAlbum, idUser, Titulo, Preview)
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
}

module.exports = {
    postagens,
    postagens_gerais,
    cadastrar
}