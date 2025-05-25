var database = require("../database/config")


function cadastrar(sentimento, historia, idMusica, idArtista, artista, Foto_artista, Titulo_Album, Data_Lancamento, Foto_Album, idAlbum, idUser, Titulo, Preview) {


    var verificarArtista = `SELECT * FROM Artista WHERE idArtista = ${idArtista};`;
    var inserirArtista = `INSERT INTO Artista VALUES(${idArtista}, "${artista}", '${Foto_artista}');`;

    var verificarAlbum = `SELECT * FROM Album WHERE idAlbum = ${idAlbum} AND FkArtista = ${idArtista};`;
    var inserirAlbum = `INSERT INTO Album VALUES(${idAlbum}, ${idArtista}, "${Titulo_Album}", '${Data_Lancamento}', '${Foto_Album}');`;

    var verificarMusica = `SELECT * FROM Musica WHERE idMusica = ${idMusica};`;
    var inserirMusica = `INSERT INTO Musica VALUES(${idMusica}, "${Titulo}", '${Preview}',${idAlbum});`;

    var verificarPostagem = `
    SELECT * FROM Postagem WHERE FkUsuario = ${idUser} AND FkMusica = ${idMusica};
`;
    var inserirPostagem = `
        INSERT INTO Postagem VALUES(DEFAULT, '${sentimento}', '${historia}', DEFAULT, ${idUser}, ${idMusica});

    `;


    return database.executar(verificarArtista).then(resultadoArtista => {
        if (resultadoArtista.length === 0) {
            return database.executar(inserirArtista);
        };
    }).then(() => {
        return database.executar(verificarAlbum).then(resultadoAlbum => {
            if (resultadoAlbum.length === 0) {
                return database.executar(inserirAlbum);
            }
        }).then(() => {
            return database.executar(verificarMusica).then(resultadoMusica => {
                if (resultadoMusica.length === 0) {
                    return database.executar(inserirMusica);
                }
            });
        });
    }).then(() => {
        return database.executar(verificarPostagem).then(resultadoPostagem => {
            if (resultadoPostagem.length === 0) {
                return database.executar(inserirPostagem);
            }
        });
    });

}




function postagens(idUsuario) {
    var instrucaoSql = `SELECT Postagem.idPostagem ,Postagem.Sentimento as Sentimento, Artista.Nome as Artista ,Postagem.Historia AS Historia, Musica.Titulo AS Musica, 
Album.foto as Foto, Musica.Preview,  DATE_FORMAT(Postagem.DataPostagem, '%d/%m/%Y %H:%i') as "Data"
FROM Postagem JOIN Usuario ON Postagem.FkUsuario = Usuario.idUsuario JOIN Musica ON Postagem.FkMusica = Musica.idMusica 
JOIN Album ON Musica.FkAlbum = Album.idAlbum JOIN Artista ON Album.FkArtista = Artista.idArtista WHERE Usuario.idUsuario = ${idUsuario} ORDER BY Postagem.DataPostagem DESC`;
    console.log("Executando a instrução do SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}


function excluir_postagem(id_post) {
    var instrucaoSql = `DELETE FROM Postagem WHERE idPostagem = ${id_post}`;
    console.log("Executando a instrução do SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);''

}



module.exports = {
    cadastrar,
    postagens,
    excluir_postagem
}
