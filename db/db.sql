CREATE DATABASE losSimpsons;

USE losSimpsons;

CREATE TABLE capitulos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    numero_episodio INT NOT NULL,
    temporada INT NOT NULL,
    fecha_emision DATE NOT NULL,
    sinopsis TEXT
);

CREATE TABLE personajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    ocupacion VARCHAR(255),
    descripcion TEXT
);


CREATE TABLE frases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto TEXT NOT NULL,
    marca_tiempo TIME NULL,
    descripcion TEXT,
    personaje_id INT NOT NULL,
    capitulo_id INT NOT NULL,
    FOREIGN KEY (personaje_id) REFERENCES personajes(id),
    FOREIGN KEY (capitulo_id) REFERENCES capitulos(id)
);


CREATE TABLE personajes_capitulos (
    personaje_id INT NOT NULL,
    capitulo_id INT NOT NULL,
    PRIMARY KEY (personaje_id, capitulo_id),
    FOREIGN KEY (personaje_id) REFERENCES personajes(id),
    FOREIGN KEY (capitulo_id) REFERENCES capitulos(id)
);


INSERT INTO capitulos (titulo, numero_episodio, temporada, fecha_emision, sinopsis) VALUES
('Bart el genio', 2, 1, '1990-01-14', 'Bart cambia su examen con el de Martin y termina en una escuela para niños superdotados.'),
('La odisea de Homero', 3, 1, '1990-01-21', 'Homero cree que perderá su trabajo y considera el suicidio.'),
('Krusty va a la cárcel', 6, 1, '1990-02-11', 'Krusty es arrestado y Bart intenta demostrar su inocencia.'),
('El llamado de Lisa', 7, 1, '1990-02-18', 'Lisa se vuelve vegetariana después de una visita escolar al zoológico.'),
('La cabeza de Jebediah', 5, 1, '1990-02-04', 'Bart decapita por accidente una estatua histórica de Springfield.');

INSERT INTO personajes (nombre, apellido, ocupacion, descripcion) VALUES
('Homer', 'Simpson', 'Inspector de seguridad', 'Padre torpe pero de buen corazón.'),
('Bart', 'Simpson', 'Estudiante', 'Niño rebelde con una inclinación por las travesuras.'),
('Lisa', 'Simpson', 'Estudiante', 'Niña superdotada, amante del saxofón y la justicia social.'),
('Marge', 'Simpson', 'Ama de casa', 'Madre paciente y moral de la familia.'),
('Krusty', 'el Payaso', 'Presentador de TV', 'Payaso famoso y decadente que dirige un programa infantil.');

INSERT INTO frases (texto, marca_tiempo, descripcion, personaje_id, capitulo_id) VALUES
('¡Doh!', '00:01:20', 'Frase icónica de Homero al cometer un error.', 1, 2),
('¡Ay caramba!', '00:05:03', 'Expresión clásica de Bart.', 2, 1),
('Si alguien me necesita, estaré en mi habitación.', '00:12:44', 'Refleja la personalidad introspectiva de Lisa.', 3, 4),
('¡No tengo nada que esconder! Excepto... eso.', '00:06:20', 'Krusty intentando parecer inocente.', 5, 3),
('No te olvides de lavar detrás de las orejas.', NULL, 'Frase materna de Marge.', 4, 1);

INSERT INTO personajes_capitulos (personaje_id, capitulo_id) VALUES
(1, 2), -- Homer en La odisea de Homero
(2, 1), -- Bart en Bart el genio
(3, 4), -- Lisa en El llamado de Lisa
(4, 1), -- Marge en Bart el genio
(5, 3); -- Krusty en Krusty va a la cárcel
