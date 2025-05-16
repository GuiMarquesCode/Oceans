var database = require("../database/config")

function dados_artista(idArtista) {
    var instrucaoSql = `SELECT * FROM Artista WHERE idArtista = ${idArtista}`;
    console.log("Executando a instrução do SQL:\n " + instrucaoSql)
    return database.executar(instrucaoSql);
}

function postagens_gerais() {
    var instrucaoSql = `SELECT Usuario.idUsuario as ID,Usuario.Nome as Nome, Postagem.Sentimento as Sentimento, Postagem.Historia AS Historia, Postagem.DataPostagem as Data,Musica.Titulo AS Musica , Album.foto as Foto, Musica.Preview
    FROM Postagem JOIN Usuario ON Postagem.FkUsuario = Usuario.idUsuario JOIN Musica ON Postagem.FkMusica = Musica.idMusica 
    JOIN Album ON Musica.FkAlbum = Album.idAlbum WHERE Usuario.idUsuario ORDER BY Postagem.DataPostagem DESC;`;
    console.log("Executando a instrução do SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}


function postagens_artista(idArtista) {

    var instrucaoSql = `
        SELECT COUNT(Postagem.Sentimento) AS Num_Post FROM Postagem JOIN Musica ON Postagem.FkMusica = Musica.idMusica
        JOIN Album ON Musica.FkAlbum = Album.idAlbum JOIN Artista ON Album.FkArtista = Artista.idArtista WHERE Artista.idArtista = ${idArtista};
    `;
    console.log("Executando a instrução do SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function ranking_artista() {
    var instrucaoSql = `
         SELECT Artista.idArtista ,Artista.Nome, Artista.Foto, COUNT(Postagem.Sentimento) AS Num_Post FROM Postagem JOIN Musica ON Postagem.FkMusica = Musica.idMusica
        JOIN Album ON Musica.FkAlbum = Album.idAlbum JOIN Artista ON Album.FkArtista = Artista.idArtista
        GROUP BY Artista.idArtista ,Artista.Nome, Artista.Foto ORDER BY COUNT(Postagem.idPostagem) DESC LIMIT 3;   
       
    `;
    console.log("Executando a instrução do SQL : \n"+ instrucaoSql);
    return database.executar(instrucaoSql)
}

module.exports = {
    dados_artista,
    postagens_artista,
    ranking_artista,
    postagens_gerais

}
