CREATE DATABASE Oceans;
use Oceans;
drop database Oceans;


CREATE TABLE Usuario
(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(130),
    Email VARCHAR(70),
    Senha VARCHAR(45)
);

CREATE TABLE Musica (
	idMusica BIGINT PRIMARY KEY,
    Titulo VARCHAR(150),
    preview TEXT
);

CREATE TABLE Artista(
	idArtista BIGINT PRIMARY KEY, 
    Nome VARCHAR(130),
    Foto VARCHAR(255)
);

CREATE TABLE Album(
	idIdentificador INT AUTO_INCREMENT,
	idAlbum BIGINT,
    FkArtista BIGINT,
    FkMusica BIGINT,
    Titulo_Album VARCHAR(150),
    Data_Lancamento DATE,
    Foto VARCHAR(255),
    CONSTRAINT PkCompostaAlbum PRIMARY KEY (idIdentificador ,FkArtista, FkMusica),
    CONSTRAINT ConstFkArtista FOREIGN KEY (FkArtista) REFERENCES Artista(idArtista),
    CONSTRAINT ConstFkMusicaAlbum FOREIGN KEY (FkMusica) REFERENCES Musica(idMusica)
);

CREATE TABLE Postagem(
	idPostagem INT AUTO_INCREMENT,
    Sentimento VARCHAR(45),
	HISTORIA TEXT,
    DataPostagem DATETIME DEFAULT CURRENT_TIMESTAMP(),
    FkUsuario INT,
    FkMusica BIGINT,
    CONSTRAINT PkComposta PRIMARY KEY(idPostagem, FkUsuario,FkMusica),
    CONSTRAINT ConstFkMusica FOREIGN KEY (FkMusica) REFERENCES Musica(idMusica),
    CONSTRAINT ConstFkUser FOREIGN KEY (FkUsuario) REFERENCES Usuario(idUsuario)
);


SELECT * FROM Usuario;
SELECT * FROM Postagem;
SELECT * FROM Artista;
SELECT * FROM Musica;
SELECT * FROM Album;


-- Modelo de inserts: 

INSERT INTO Musica VALUES
( 2743578151 , 'Espresso','https://cdnt-preview.dzcdn.net/api/1/1/1/7/a/0/17a21c40ce4af3ac9514aac756403188.mp3?hdnea=exp=1746384065~acl=/api/1/1/1/7/a/0/17a21c40ce4af3ac9514aac756403188.mp3*~data=user_id=0,application_id=42~hmac=127b26a03b34e1b90cb72a1dda0ee5e5f08bf517bc17842a03f3da8459500a33' );

INSERT INTO Artista VALUES
(1176900, 'Sabrina Carpenter' , 'https://cdn-images.dzcdn.net/images/artist/e94f06a0e50a8b1a3032064d1552027c/500x500-000000-80-0-0.jpg');

INSERT INTO Album VALUES 
(571147791 , 1176900 ,2743578151 , 'Espresso' , '2024-04-12' , 'https://cdn-images.dzcdn.net/images/cover/e3221287a77eb262944e6528766eeba4/500x500-000000-80-0-0.jpg');

INSERT INTO Postagem VALUES
(DEFAULT , 'Felicidade', 'Sei la o que não sei o que la' , DEFAULT , 1, 2743578151);



-- Modelo select:
SELECT Musica.Titulo as Titulo, Album.Titulo_Album as Nome_Album, Album.Data_lancamento as Lancamento, Artista.Nome as Artista 
FROM Musica JOIN Album ON Album.FkMusica = Musica.idMusica JOIN Artista ON Album.FkArtista = Artista.idArtista;

SELECT Postagem.Sentimento as Sentimento, Postagem.Historia AS Historia, Musica.Titulo AS Musica , Album.foto as Foto, Musica.Preview
FROM Postagem JOIN Usuario ON Postagem.FkUsuario = Usuario.idUsuario JOIN Musica ON Postagem.FkMusica = Musica.idMusica 
JOIN Album ON Album.FkMusica = Musica.idMusica WHERE Usuario.idUsuario = 4;

	
-- Feed
SELECT Usuario.idUsuario as ID,Usuario.Nome as Nome, Postagem.Sentimento as Sentimento, Postagem.Historia AS Historia, Postagem.DataPostagem as Data,Musica.Titulo AS Musica , Album.foto as Foto, Musica.Preview
FROM Postagem JOIN Usuario ON Postagem.FkUsuario = Usuario.idUsuario JOIN Musica ON Postagem.FkMusica = Musica.idMusica 
JOIN Album ON Album.FkMusica = Musica.idMusica WHERE Usuario.idUsuario ORDER BY Postagem.DataPostagem;
