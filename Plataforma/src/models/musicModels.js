var database = require("../database/config")




function cadastrar(sentimento, historia, idMusica, idArtista, artista, Foto_artista, Titulo_Album, Data_Lancamento, Foto_Album, idAlbum, idUser , Titulo, Preview) {
    var instrucaoSql = `
            INSERT INTO usuario (nome, email ,senha) VALUES ( '${nome}', '${email}', '${senha}');
        `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}



module.exports = {
    cadastrar
}
