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

INSERT INTO capitulos (titulo, numero_episodio, temporada, fecha_emision, sinopsis) VALUES
('Bart el genio', 2, 1, '1990-01-14', 'Bart cambia su examen con el de Martin y termina en una escuela para niños superdotados.'),
('La odisea de Homero', 3, 1, '1990-01-21', 'Homero piensa que va a perder su trabajo y considera el suicidio, hasta que encuentra una nueva motivación en la vida.');

CREATE TABLE personajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    ocupacion VARCHAR(255),
    descripcion TEXT
);

INSERT INTO personajes (nombre, apellido, ocupacion, descripcion) VALUES
('Homer', 'Simpson', 'Inspector de seguridad en la planta nuclear', 'Padre de familia torpe pero entrañable.'),
('Bart', 'Simpson', 'Estudiante', 'Hijo travieso y rebelde con corazón de oro.'),
('Lisa', 'Simpson', 'Estudiante', 'Niña prodigio, intelectual y activista.'),
('Marge', 'Simpson', 'Ama de casa', 'Madre dedicada y moral de la familia.');

CREATE TABLE frases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto TEXT NOT NULL,
    marca_tiempo TIME NULL,
    descripcion TEXT,
    personaje_id INT NOT NULL,
    FOREIGN KEY (personaje_id) REFERENCES personajes(id)
);

INSERT INTO frases (texto, marca_tiempo, descripcion, personaje_id) VALUES
('¡Doh!', '00:02:15', 'Frase icónica de Homer al cometer un error.', 1),
('¡Ay caramba!', '00:05:03', 'Expresión característica de Bart.', 2),
('Si alguien me necesita, estaré en mi habitación.', '00:12:44', 'Frase representativa del carácter introspectivo de Lisa.', 3),
('No te olvides de lavar detrás de las orejas.', NULL, 'Frase típica de madre preocupada.', 4);

CREATE TABLE personajes_capitulos (
    personaje_id INT NOT NULL,
    capitulo_id INT NOT NULL,
    PRIMARY KEY (personaje_id, capitulo_id),
    FOREIGN KEY (personaje_id) REFERENCES personajes(id),
    FOREIGN KEY (capitulo_id) REFERENCES capitulos(id)
);

-- Relacionar personajes con capítulos
INSERT INTO personajes_capitulos (personaje_id, capitulo_id) VALUES
(1, 1), -- Homer en "Bart el genio"
(1, 2), -- Homer en "La odisea de Homer"
(2, 1), -- Bart en "Bart el genio"
(3, 1), -- Lisa en "Bart el genio"
(4, 1), -- Marge en "Bart el genio"
(4, 2); -- Marge en "La odisea de Homer"

