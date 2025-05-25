var database = require("../database/config")

function dados_artista(idArtista) {
    var instrucaoSql = `SELECT * FROM Artista WHERE idArtista = ${idArtista}`;
    console.log("Executando a instrução do SQL:\n " + instrucaoSql)
    return database.executar(instrucaoSql);
}

function postagens_gerais() {
    var instrucaoSql = `SELECT Usuario.idUsuario as ID,Usuario.Nome as Nome, Postagem.Sentimento as Sentimento, Postagem.Historia AS Historia,
  DATE_FORMAT(Postagem.DataPostagem, '%d/%m/%Y %H:%i') as "Data",Musica.Titulo AS Musica , Album.foto as Foto,
Musica.Preview, Artista.Nome as Artista
FROM Postagem JOIN Usuario ON Postagem.FkUsuario = Usuario.idUsuario JOIN Musica ON Postagem.FkMusica = Musica.idMusica 
JOIN Album ON Musica.FkAlbum = Album.idAlbum
JOIN Artista ON Album.FkArtista = Artista.idArtista
WHERE Usuario.idUsuario ORDER BY Postagem.DataPostagem DESC;`;
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
    console.log("Executando a instrução do SQL : \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function principais_musicas(idArtista) {

    var instrucaoSql = `
         SELECT Musica.Titulo as Titulo, Count(Postagem.FkMusica) as "Quantidade"
        FROM  Postagem LEFT JOIN Musica ON Postagem.FkMusica = Musica.idMusica
        LEFT JOIN Album ON Musica.FkAlbum = Album.idAlbum LEFT JOIN Artista ON 
Album.FkArtista = Artista.idArtista WHERE Artista.idArtista = ${idArtista}
    GROUP BY Musica.Titulo , Postagem.FkMusica ORDER BY Count(Postagem.FkMusica) DESC limit 3;
       
    `;
    console.log("Executando a instrução do SQL : \n" + instrucaoSql);
    return database.executar(instrucaoSql)

}


function sentimentos_artista(idArtista) {
    var instrucaoSql = `
         SELECT Artista.Nome, Postagem.Sentimento, COUNT(Postagem.Sentimento) as Sentimentos
        FROM Postagem JOIN Musica ON Postagem.FkMusica = Musica.idMusica 
        JOIN Album ON Musica.FkAlbum = Album.idAlbum 
        JOIN Artista ON Album.FkArtista = Artista.idArtista  WHERE Artista.idArtista = ${idArtista}
        GROUP BY Artista.Nome , Postagem.Sentimento ORDER BY COUNT(Postagem.Sentimento) DESC ;

       
    `;
    console.log("Executando a instrução do SQL : \n" + instrucaoSql);
    return database.executar(instrucaoSql)


}


function postagens_sobre_artista(idArtista) {
    var instrucaoSql = `
        SELECT P.Sentimento, P.Historia, DATE_FORMAT(P.DataPostagem, '%d/%m/%Y %H:%i') as "Data", M.Titulo, M.preview, A.Foto, Ar.Nome
       FROM Postagem AS P JOIN Musica AS M ON P.FkMusica = M.idMusica JOIN Album AS A ON M.FkAlbum = A.idAlbum
       JOIN Artista AS Ar ON A.FkArtista = Ar.idArtista WHERE Ar.idArtista = ${idArtista} ORDER BY RAND() LIMIT 2; 
    `;
    console.log("Executando a instrução do SQL : \n" + instrucaoSql);
    return database.executar(instrucaoSql)

}

module.exports = {
    dados_artista,
    sentimentos_artista,
    postagens_artista,
    ranking_artista,
    postagens_gerais,
    principais_musicas,
    postagens_sobre_artista

}
