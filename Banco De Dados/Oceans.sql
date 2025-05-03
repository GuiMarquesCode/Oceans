CREATE DATABASE Oceans;
use Oceans;

CREATE TABLE Usuario
(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(70),
    Email VARCHAR(50),
    Senha VARCHAR(45)
);

CREATE TABLE Musica (
	idMusica INT PRIMARY KEY AUTO_INCREMENT,
    Titulo VARCHAR(45),
    idDeezer INT,
    preview TEXT
);

CREATE TABLE Artista(
	idArtista INT PRIMARY KEY AUTO_INCREMENT, 
    Nome VARCHAR(45),
    Foto VARCHAR(255),
    idDeezer INT
);

CREATE TABLE Album(
	idAlbum INT AUTO_INCREMENT,
    FkArtista INT,
    FkMusica INT,
    Titulo_Album VARCHAR(45),
    Data_Lancamento CHAR(10),
    Foto VARCHAR(255),
    idDeezer INT,
    CONSTRAINT PkCompostaAlbum PRIMARY KEY (idAlbum, FkArtista, FkMusica),
    CONSTRAINT ConstFkArtista FOREIGN KEY (FkArtista) REFERENCES Artista(idArtista),
    CONSTRAINT ConstFkMusicaAlbum FOREIGN KEY (FkMusica) REFERENCES Musica(idMusica)
);

CREATE TABLE Postagem(
	idPostagem INT AUTO_INCREMENT,
    Sentimento VARCHAR(45),
	HISTORIA TEXT,
    DataPostagem DATETIME DEFAULT CURRENT_TIMESTAMP(),
    FkUsuario INT,
    FkMusica INT,
    CONSTRAINT PkComposta PRIMARY KEY(idPostagem, FkUsuario,FkMusica),
    CONSTRAINT ConstFkMusica FOREIGN KEY (FkMusica) REFERENCES Musica(idMusica),
    CONSTRAINT ConstFkUser FOREIGN KEY (FkUsuario) REFERENCES Usuario(idUsuario)
);


SELECT * FROM usuario;

