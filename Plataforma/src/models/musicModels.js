var database = require("../database/config")


function cadastrar(sentimento, historia, idMusica, idArtista, artista, Foto_artista, Titulo_Album, Data_Lancamento, Foto_Album, idAlbum, idUser, Titulo, Preview) {
    var instrucaoMusica = `
            INSERT INTO Musica VALUES( ${idMusica} , "${Titulo}",'${Preview}');

        `;

    var instrucaoArtista = `
            INSERT INTO Artista VALUES( ${idArtista} , "${artista}", '${Foto_artista}');
        `;
    var instrucaoAlbum = `
            INSERT INTO Album VALUES( ${idAlbum}, ${idArtista} , ${idMusica} , "${Titulo_Album}", ${Data_Lancamento} , '${Foto_Album}' );
        `;
    var instrucaoPostagem = `
            INSERT INTO Postagem VALUES(DEFAULT , '${sentimento}' , '${historia}', DEFAULT , ${idUser} , ${idMusica});
        `;

    console.log("Executando a instrução SQL: \n" + instrucaoMusica, instrucaoArtista, instrucaoAlbum, instrucaoPostagem);

    return database.executar(instrucaoMusica)
        .then(() => database.executar(instrucaoArtista))
        .then(() => database.executar(instrucaoAlbum))
        .then(() => database.executar(instrucaoPostagem))
}

function postagens(idUsuario) {
    var instrucaoSql = `SELECT Postagem.Sentimento as Sentimento, Postagem.Historia AS Historia, Musica.Titulo AS Musica , Album.foto as Foto, Musica.Preview
    FROM Postagem JOIN Usuario ON Postagem.FkUsuario = Usuario.idUsuario JOIN Musica ON Postagem.FkMusica = Musica.idMusica 
    JOIN Album ON Album.FkMusica = Musica.idMusica WHERE Usuario.idUsuario = ${idUsuario} `;
    console.log("Executando a instrução do SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function postagens_gerais() {
    var instrucaoSql = `SELECT Usuario.idUsuario as ID,Usuario.Nome as Nome, Postagem.Sentimento as Sentimento, Postagem.Historia AS Historia, Postagem.DataPostagem as Data,Musica.Titulo AS Musica , Album.foto as Foto, Musica.Preview
    FROM Postagem JOIN Usuario ON Postagem.FkUsuario = Usuario.idUsuario JOIN Musica ON Postagem.FkMusica = Musica.idMusica 
    JOIN Album ON Album.FkMusica = Musica.idMusica WHERE Usuario.idUsuario ORDER BY Postagem.DataPostagem`;
    console.log("Executando a instrução do SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}


module.exports = {
    cadastrar,
    postagens,
    postagens_gerais
}
