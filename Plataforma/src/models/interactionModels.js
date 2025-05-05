var database = require("../database/config")



function postagens_gerais() {
    var instrucaoSql = `SELECT Usuario.idUsuario as ID,Usuario.Nome as Nome, Postagem.Sentimento as Sentimento, Postagem.Historia AS Historia, Postagem.DataPostagem as Data,Musica.Titulo AS Musica , Album.foto as Foto, Musica.Preview
    FROM Postagem JOIN Usuario ON Postagem.FkUsuario = Usuario.idUsuario JOIN Musica ON Postagem.FkMusica = Musica.idMusica 
    JOIN Album ON Album.FkMusica = Musica.idMusica ORDER BY Postagem.DataPostagem  DESC `;
    console.log("Executando a instrução do SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}


module.exports = {
    postagens_gerais
    
}
