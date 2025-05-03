// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var senha = sessionStorage.Senha_USUARIO;
    var idUsuario = sessionStorage.ID_USUARIO;
    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null && idUsuario != null && senha != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}


