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



CREATE TABLE Artista(
	idArtista BIGINT PRIMARY KEY, 
    Nome VARCHAR(130),
    Foto VARCHAR(255)
);

CREATE TABLE Album(
	idAlbum BIGINT,
    FkArtista BIGINT,
    Titulo_Album VARCHAR(150),
    Data_Lancamento DATE,
    Foto VARCHAR(255),
    CONSTRAINT PkCompostaAlbum PRIMARY KEY (idAlbum , FkArtista),
    CONSTRAINT ConstFkArtista FOREIGN KEY (FkArtista) REFERENCES Artista(idArtista)
);

CREATE TABLE Musica (
	idMusica BIGINT PRIMARY KEY,
    Titulo VARCHAR(150),
    preview TEXT,
    FkAlbum BIGINT,
    CONSTRAINT ConstFkMusicaAlbum2 FOREIGN KEY (FkAlbum) REFERENCES Album(idAlbum)
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

INSERT INTO Usuario VALUES
(DEFAULT, 'Guilherme' , 'Guilherme@Gmail.com' , '123');

INSERT INTO Artista VALUES
(1176900, 'Sabrina Carpenter' , 'https://cdn-images.dzcdn.net/images/artist/e94f06a0e50a8b1a3032064d1552027c/500x500-000000-80-0-0.jpg');

INSERT INTO Album VALUES 
(571147791 , 1176900  , 'Espresso' , '2024-04-12' , 'https://cdn-images.dzcdn.net/images/cover/e3221287a77eb262944e6528766eeba4/500x500-000000-80-0-0.jpg');



INSERT INTO Musica VALUES
( 2743578151, 'Espresso2','https://cdnt-preview.dzcdn.net/api/1/1/1/7/a/0/17a21c40ce4af3ac9514aac756403188.mp3?hdnea=exp=174638406
5~acl=/api/1/1/1/7/a/0/17a21c40ce4af3ac9514aac756403188.mp3*~d
ata=user_id=0,application_id=42~hmac=127b26a03b34e1b90cb72a1dda0ee5e5f08bf517bc17842a03f3da8459500a33',571147791);


INSERT INTO Postagem VALUES
(DEFAULT , 'Felicidade', 'Sei la o que não sei o que la' , DEFAULT , 1, 2743578151);



-- Modelo select:
SELECT Musica.Titulo as Titulo, Album.Titulo_Album as Nome_Album, Album.Data_lancamento as Lancamento, Artista.Nome as Artista 
FROM Musica JOIN Album ON Musica.FkAlbum= Album.idAlbum JOIN Artista ON Album.FkArtista = Artista.idArtista;

SELECT Postagem.Sentimento as Sentimento, Artista.Nome as Artista ,Postagem.Historia AS Historia, Musica.Titulo AS Musica, 
Album.foto as Foto, Musica.Preview,  DATE_FORMAT(Postagem.DataPostagem, '%d/%m/%Y %H:%i') as "Data"
FROM Postagem JOIN Usuario ON Postagem.FkUsuario = Usuario.idUsuario JOIN Musica ON Postagem.FkMusica = Musica.idMusica 
JOIN Album ON Musica.FkAlbum = Album.idAlbum JOIN Artista ON Album.FkArtista = Artista.idArtista WHERE Usuario.idUsuario = 1;

	
-- Feed
SELECT Usuario.idUsuario as ID,Usuario.Nome as Nome, Postagem.Sentimento as Sentimento, Postagem.Historia AS Historia,
  DATE_FORMAT(Postagem.DataPostagem, '%d/%m/%Y %H:%i') as "Data",Musica.Titulo AS Musica , Album.foto as Foto,
Musica.Preview, Artista.Nome as Artista
FROM Postagem JOIN Usuario ON Postagem.FkUsuario = Usuario.idUsuario JOIN Musica ON Postagem.FkMusica = Musica.idMusica 
JOIN Album ON Musica.FkAlbum = Album.idAlbum
JOIN Artista ON Album.FkArtista = Artista.idArtista
WHERE Usuario.idUsuario ORDER BY Postagem.DataPostagem DESC;

-- Estatistiscas artista	
SELECT COUNT(Postagem.Sentimento) AS Num_Post FROM Postagem JOIN Musica ON Postagem.FkMusica = Musica.idMusica
JOIN Album ON Musica.FkAlbum = Album.idAlbum JOIN Artista ON Album.FkArtista = Artista.idArtista WHERE Artista.idArtista = 4495513;

-- Pegar Ranking
 SELECT Artista.idArtista ,Artista.Nome, Artista.Foto, COUNT(Postagem.Sentimento) AS Num_Post FROM Postagem JOIN Musica ON Postagem.FkMusica = Musica.idMusica
JOIN Album ON Musica.FkAlbum = Album.idAlbum JOIN Artista ON Album.FkArtista = Artista.idArtista
GROUP BY Artista.idArtista ,Artista.Nome, Artista.Foto ORDER BY COUNT(Postagem.idPostagem) DESC LIMIT 3; 

-- Selecionar maior sentimento de cada artista

SELECT Artista.Nome AS Nome, Postagem.Sentimento , Count(Postagem.Sentimento) FROM Artista
JOIN Album ON Album.FkArtista = Artista.idArtista 
JOIN Musica ON Musica.FkAlbum = Album.idAlbum
JOIN Postagem ON Postagem.FkMusica = Musica.idMusica GROUP BY Artista.Nome,Postagem.Sentimento ;  
    
-- Principais sentimentos

SELECT Postagem.Sentimento AS Sentimento, Count(Postagem.Sentimento) as Quantidade 
FROM Postagem JOIN Musica ON Postagem.FkMusica = Musica.idMusica 
JOIN Album ON Musica.FkAlbum = Album.idAlbum
JOIN Artista ON Album.FkArtista = Artista.idArtista
WHERE Artista.idArtista = 4495513 GROUP BY Postagem.Sentimento ORDER BY Count(Postagem.Sentimento) Desc;

-- Mostrar as 3 músicas mais cadastradas de cada artista

SELECT Musica.Titulo as Titulo, Count(Postagem.FkMusica) as "Quantidade"
FROM  Postagem JOIN Musica ON Postagem.FkMusica = Musica.idMusica
JOIN Album ON Musica.FkAlbum = Album.idAlbum JOIN Artista ON 
Album.FkArtista = Artista.idArtista WHERE Artista.idArtista = 4495513
GROUP BY Musica.Titulo , Postagem.FkMusica ORDER BY Count(Postagem.FkMusica) DESC limit 3;


-- Mostrar o total de postagens do usuário

SELECT Usuario.Nome as Nome, COUNT(Postagem.FkUsuario) FROM 
Usuario JOIN Postagem ON Postagem.FkUsuario = Usuario.idUsuario where idUsuario = 5;

-- Mostrar o maior sentimento que o usuário sentiu 

SELECT Postagem.Sentimento as Sentimento,
COUNT(Postagem.Sentimento) as Sentimentos FROM Usuario 
JOIN Postagem ON Postagem.FkUsuario = Usuario.idUsuario WHERE idUsuario = 5
GROUP BY Postagem.Sentimento ORDER BY COUNT(Postagem.Sentimento) Desc LIMIT 1;

-- lista a quantidade de cada sentimentos que o usuario sentiu alter

SELECT  Postagem.Sentimento as Sentimento,
COUNT(Postagem.Sentimento) as Sentimentos FROM Usuario 
JOIN Postagem ON Postagem.FkUsuario = Usuario.idUsuario WHERE idUsuario = 5
GROUP BY Postagem.Sentimento ORDER BY COUNT(Postagem.Sentimento) Desc;

-- Artista favorito do usuário

SELECT 
  Usuario.Nome AS Nome, 
  Artista.Nome AS Artista,
  COUNT(Postagem.idPostagem) AS Numero
FROM Usuario
JOIN Postagem ON Postagem.FkUsuario = Usuario.idUsuario
JOIN Musica ON Postagem.FkMusica = Musica.idMusica
JOIN Album ON Musica.FkAlbum = Album.idAlbum
JOIN Artista ON Album.FkArtista = Artista.idArtista
WHERE Usuario.idUsuario = 1
GROUP BY Usuario.Nome, Artista.Nome
ORDER BY COUNT(Postagem.idPostagem) DESC limit 1;




