//Configurar el servidor
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const server = express();
const PORT = process.env.PORT || 4000;

server.use(cors());
server.use(express.json());
// server.set('view engine', 'ejs');

//Inciar el servidor
server.listen(PORT, () => {
    console.log(`Server listening in http://localhost:${PORT}`)
})

//Conectar a MYSQL
const getConnection = async () => {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT 
    })
};

//Obtener todas las frases y la info del personaje
server.get('/frases', async (request, response) => {
    try {  
        const conn = await getConnection();
        const [result] = await conn.query('SELECT * FROM frases JOIN personajes ON frases.personaje_id = personajes.id JOIN capitulos ON frases.capitulo_id = capitulos.id;');
        await conn.end();

        response.json({
            info:{"count": result.length},
            result: result
        })
    }
    catch(error) {
            response.status(500).json({message: error})
        }    
})

//Obtener una sola frase
server.get('/frases/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const conn = await getConnection();
        const [result] = await conn.query('SELECT * FROM frases JOIN personajes ON frases.personaje_id = personajes.id JOIN capitulos ON frases.capitulo_id = capitulos.id WHERE frases.id = ?', [id]);
        await conn.end();

        if (result.length === 0) {
            return response.status(404).json({ error: "Frase no encontrada"});
        }

        response.json({
            result: result
        })
    }
    catch(error) {
            response.status(500).json({message: error})
        }
})

//Actualizar una frase
server.put('/frases/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const { texto, marca_tiempo, descripcion, personaje_id } = request.body;

        const conn = await getConnection();
        const [result] = await conn.query('UPDATE frases SET texto = ?, marca_tiempo = ?, descripcion = ?, personaje_id = ? WHERE id = ?', 
                                        [texto, marca_tiempo, descripcion, personaje_id, id]);
        await conn.end();
    }
    catch(error) {
            response.status(500).json({message: error})
        }
})

//Añadir una frase
server.post('/frases', async (request, response) => {
    const { texto, marca_tiempo, descripcion, personaje_id } = request.body;  

    if (!texto || !marca_tiempo || !descripcion || !personaje_id) {
        return result.status(400).json({
            succes: false, 
            message: "Faltan campos obligatorios: texto, marca de tiempo, descripción o el id del personaje"
        })
    }
        try {
            const conn = await getConnection();
            const [result] = await conn.query('INSERT INTO frases(texto, marca_tiempo, descripcion, personaje_id) VALUES (?,?,?,?)', 
                                            [texto, marca_tiempo, descripcion, personaje_id]);
            console.log(result);                                
            await conn.end();

            //Validar si se ha podido insertar
            response.status(200).json({
                "success": true,
                "id": result.insertId
            })
        }
        catch(error) {
            response.status(500).json({message: error})
        }
})

//Eliminar una frase
server.delete('/frases/:id', async (request, response) => {
    const id = request.params.id;
    try {
        const conn = await getConnection();
        const [result] = await conn.query('DELETE FROM frases WHERE id = ?', [id]);                              
        await conn.end();

        response.status(200).json({
            "success": true
        })
    }
    catch(error) {
            response.status(500).json({message: error})
        }
})

//Obtener todos los personajes
server.get('/personajes', async (request, response) => {
    try {  
        const conn = await getConnection();
        const [result] = await conn.query('SELECT * FROM personajes');
        await conn.end();

        response.json({
            info:{"count": result.length},
            result: result
        })
    }
    catch(error) {
            response.status(500).json({message: error})
        }   
})

//Obtener un solo personaje y sus frases más memorables
server.get('/personajes/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const conn = await getConnection();
        const [result] = await conn.query('SELECT personajes.id, personajes.nombre, personajes.apellido, personajes.ocupacion, personajes.descripcion, frases.texto FROM personajes LEFT JOIN frases ON personajes.id = frases.personaje_id  WHERE personajes.id = ?', [id]);
        await conn.end();

        if (result.length === 0) {
            return response.status(404).json({ error: "Personaje no encontrado"});
        }

        response.json({
            result: result
        })
    }
    catch(error) {
            response.status(500).json({message: error})
        }
})

//Añadir un personaje
server.post('/personajes', async (request, response) => {
    const { nombre, apellido, ocupacion, descripcion } = request.body;  

    if (!nombre || !apellido || !ocupacion || !descripcion ) {
        return response.status(400).json({
            succes: false, 
            message: "Faltan campos obligatorios: nombre, apellido, ocupacion o descripcion "
        })
    }
        try {
            const conn = await getConnection();
            const [result] = await conn.query('INSERT INTO personajes(nombre, apellido, ocupacion, descripcion ) VALUES (?,?,?,?)', 
                                            [nombre, apellido, ocupacion, descripcion ]);
            console.log(result);                                
            await conn.end();

            //Validar si se ha podido insertar
            response.status(200).json({
                "success": true,
                "id": result.insertId
            })
        }
        catch(error) {
            response.status(500).json({message: error})
        }
})

//Actualizar un personaje
server.put('/personajes/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const { nombre, apellido, ocupacion, descripcion } = request.body;

        const conn = await getConnection();
        const [result] = await conn.query('UPDATE personajes SET nombre = ?, apellido = ?, ocupacion = ?, descripcion = ? WHERE id = ?', 
                                        [nombre, apellido, ocupacion, descripcion, id]);
        await conn.end();
    }
    catch(error) {
            response.status(500).json({message: error})
        }
})

//Eliminar un personaje
server.delete('/personajes/:id', async (request, response) => {
    const id = request.params.id;
    try {
        const conn = await getConnection();
        const [result] = await conn.query('DELETE FROM personajes WHERE personajes. id = ?', [id]);                              
        await conn.end();

        response.status(200).json({
            "success": true
        })
    }
    catch(error) {
            response.status(500).json({message: error})
        }
})

//Obtener todos los capítulos
server.get('/capitulos', async (request, response) => {
    try {  
        const conn = await getConnection();
        const [result] = await conn.query('SELECT * FROM capitulos');
        await conn.end();

        response.json({
            info:{"count": result.length},
            result: result
        })
    }
    catch(error) {
            response.status(500).json({message: error})
        }   
})

//Obtener un solo capítulo y sus frases más memorables
server.get('/capitulos/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const conn = await getConnection();
        const [result] = await conn.query('SELECT capitulos.id, capitulos.titulo, capitulos.numero_episodio, capitulos.temporada,  capitulos.fecha_emision, capitulos.sinopsis, frases.id AS frase_id FROM capitulos LEFT JOIN frases ON capitulos.id = frases.capitulo_id WHERE capitulos.id = ?', [id]);
        await conn.end();

        if (result.length === 0) {
            return response.status(404).json({ error: "Capítulo no encontrado"});
        }

        response.json({
            result: result
        })
    }
    catch(error) {
            response.status(500).json({message: error})
        }
})

//Añadir un capítulo
server.post('/capitulos', async (request, response) => {
    const { titulo, numero_episodio, temporada, fecha_emision, sinopsis } = request.body;  

    if (!titulo || !numero_episodio || !temporada || !fecha_emision || !sinopsis ) {
        return response.status(400).json({
            succes: false, 
            message: "Faltan campos obligatorios: titulo, numero_episodio, temporada, fecha_emision o sinopsis"
        })
    }
        try {
            const conn = await getConnection();
            const [result] = await conn.query('INSERT INTO capitulos(titulo, numero_episodio, temporada, fecha_emision, sinopsis ) VALUES (?,?,?,?,?)', 
                                            [titulo, numero_episodio, temporada, fecha_emision, sinopsis]);
            console.log(result);                                
            await conn.end();

            //Validar si se ha podido insertar
            response.status(200).json({
                "success": true,
                "id": result.insertId
            })
        }
        catch(error) {
            response.status(500).json({message: error})
        }
})

//Actualizar un capítulo
server.put('/capitulos/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const { titulo, numero_episodio, temporada, fecha_emision, sinopsis } = request.body;

        const conn = await getConnection();
        const [result] = await conn.query('UPDATE capitulos SET titulo = ?, numero_episodio = ?, temporada = ?, fecha_emision = ?, sinopsis = ? WHERE id = ?', 
                                        [titulo, numero_episodio, temporada, fecha_emision, sinopsis, id]);
        await conn.end();
    }
    catch(error) {
            response.status(500).json({message: error})
        }
})

server.delete('/capitulos/:id', async (request, response) => {
    const id = request.params.id;
    try {
        const conn = await getConnection();
        const [result] = await conn.query('DELETE FROM capitulos WHERE capitulos.id = ?', [id]);                              
        await conn.end();

        response.status(200).json({
            "success": true
        })
    }
    catch(error) {
            response.status(500).json({message: error})
        }
})