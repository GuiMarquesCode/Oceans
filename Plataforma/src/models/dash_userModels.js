var database = require("../database/config");

function sentimento(idUsuario) {
    var instrucaoSql = `
    SELECT Postagem.Sentimento as Sentimento,
COUNT(Postagem.Sentimento) as Sentimentos FROM Usuario 
JOIN Postagem ON Postagem.FkUsuario = Usuario.idUsuario WHERE idUsuario = ${idUsuario}
GROUP BY Postagem.Sentimento ORDER BY COUNT(Postagem.Sentimento) Desc;
    `;
    console.log("Executando a instrução do SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}



function qtd_Postagem(idUsuario) {
    var instrucaoSql = `
    SELECT Usuario.Nome as Nome, COUNT(Postagem.FkUsuario) as "Quantidade" FROM 
Usuario JOIN Postagem ON Postagem.FkUsuario = Usuario.idUsuario where idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução do SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function melhor_artista(idUsuario) {
    var instrucaoSql = `
    SELECT 
    Artista.Nome AS Artista,
    COUNT(Postagem.idPostagem) AS Numero
    FROM Usuario
    JOIN Postagem ON Postagem.FkUsuario = Usuario.idUsuario
    JOIN Musica ON Postagem.FkMusica = Musica.idMusica
    JOIN Album ON Musica.FkAlbum = Album.idAlbum
    JOIN Artista ON Album.FkArtista = Artista.idArtista
    WHERE Usuario.idUsuario = ${idUsuario}
    GROUP BY Usuario.Nome, Artista.Nome
    ORDER BY COUNT(Postagem.idPostagem) DESC limit 1;
    `;
    console.log("Executando a instrução do SQL: \n " + instrucaoSql);
    return database.executar(instrucaoSql);
}



function indicacao_artista(Sentimento) {
    var instrucaoSql = `
   SELECT Artista.Nome as Nome, Postagem.Sentimento as Sentimento, Count(Postagem.Sentimento) as "Quantidade", Artista.idArtista as ID
FROM  Postagem JOIN Musica ON Postagem.FkMusica = Musica.idMusica
JOIN Album ON Musica.FkAlbum = Album.idAlbum JOIN Artista ON 
Album.FkArtista = Artista.idArtista WHERE Postagem.Sentimento = "${Sentimento}"
GROUP BY Artista.idArtista ,Artista.Nome , Postagem.Sentimento ORDER BY Rand() limit 1;
    `;
    console.log("Executando a instrução do SQL: \n " + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    indicacao_artista,
    sentimento,
    qtd_Postagem,
    melhor_artista
}