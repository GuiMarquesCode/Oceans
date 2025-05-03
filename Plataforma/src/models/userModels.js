var database = require("../database/config")


function deletar(idUsuario) {
    var instrucaoSql = `
        DELETE  FROM Usuario WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizar(nome,email, senha, idUsuario) {
    var instrucaoSql = `
        UPDATE Usuario SET Nome = '${nome}', Email = '${email}', Senha = '${senha}' WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idUsuario ,nome, email,senha FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function cadastrar(nome, email, senha){
    var instrucaoSql = `
            INSERT INTO Usuario (nome, email ,senha) VALUES ( '${nome}', '${email}', '${senha}');
        `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}


module.exports = {
    deletar,
    atualizar,
    autenticar,
    cadastrar
}
