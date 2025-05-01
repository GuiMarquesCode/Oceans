var database = require("../database/config")

function cadastrar(nome, email, senha){
    var instrucaoSql = `
            INSERT INTO usuario (nome, email,senha) VALUES 
            (${nome}, ${email}, ${senha});
        `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}


module.exports = {
    cadastrar
}
