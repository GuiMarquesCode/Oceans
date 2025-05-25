var database = require("../database/config");


function buscar_musica() {
    var instrucaoSql = `
        SELECT Musica.Titulo, Musica.idMusica , Musica.preview FROM Musica;
    `;
    console.log("Executando a instrução do SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function atualizar_musica(idMusica, preview) {
    var instrucaoSql = `
        UPDATE Musica SET preview = '${preview}' where idMusica = ${idMusica};
    `;
    console.log("Executando a instrução do SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}


module.exports = {
    buscar_musica,
    atualizar_musica
}