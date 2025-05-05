var database = require("../database/config")


function cadastrar(sentimento, historia, idMusica, idArtista, artista, Foto_artista, Titulo_Album, Data_Lancamento, Foto_Album, idAlbum, idUser, Titulo, Preview) {
  
    var verificarMusica = `SELECT * FROM Musica WHERE idMusica = ${idMusica};`;
    var inserirMusica = `INSERT INTO Musica VALUES(${idMusica}, "${Titulo}", '${Preview}');`;

    var verificarArtista = `SELECT * FROM Artista WHERE idArtista = ${idArtista};`;
    var inserirArtista = `INSERT INTO Artista VALUES(${idArtista}, "${artista}", '${Foto_artista}');`;

    
    var inserirAlbum = `INSERT INTO Album VALUES( DEFAULT , ${idAlbum}, ${idArtista}, ${idMusica}, "${Titulo_Album}", '${Data_Lancamento}', '${Foto_Album}');`;


    var verificarPostagem = `
    SELECT * FROM Postagem WHERE FkUsuario = ${idUser} AND FkMusica = ${idMusica};
`;
    var inserirPostagem = `
        INSERT INTO Postagem VALUES(DEFAULT, '${sentimento}', '${historia}', DEFAULT, ${idUser}, ${idMusica});
    `;


    return database.executar(verificarMusica).then(resultadoMusica => {
        if (resultadoMusica.length === 0) {
            return database.executar(inserirMusica);
        }
    }).then(() => {
        return database.executar(verificarArtista).then(resultadoArtista => {
            if (resultadoArtista.length === 0) {
                return database.executar(inserirArtista);
            }
        });
    }).then(() => {
        return database.executar(inserirAlbum)
    }).then(() => {
        return database.executar(verificarPostagem).then(resultadoPostagem => {
            if (resultadoPostagem.length === 0) {
                return database.executar(inserirPostagem);
            }
        });
    });
    
}




function postagens(idUsuario) {
    var instrucaoSql = `SELECT Postagem.Sentimento as Sentimento, Postagem.Historia AS Historia, Musica.Titulo AS Musica , Album.foto as Foto, Musica.Preview
    FROM Postagem JOIN Usuario ON Postagem.FkUsuario = Usuario.idUsuario JOIN Musica ON Postagem.FkMusica = Musica.idMusica 
    JOIN Album ON Album.FkMusica = Musica.idMusica WHERE Usuario.idUsuario = ${idUsuario} `;
    console.log("Executando a instrução do SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}




module.exports = {
    cadastrar,
    postagens
}
