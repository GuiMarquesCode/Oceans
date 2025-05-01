CREATE DATABASE Oceans;
use Oceans;

CREATE TABLE usuario
(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(70),
    Email VARCHAR(50),
    Senha VARCHAR(45)
);