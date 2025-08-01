//Configurar el servidor
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const server = express();
const PORT = 4000;

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
        const [result] = await conn.query(' SELECT * FROM frases, personajes WHERE personaje_id = personajes.id;');
        await conn.end();

        response.json({
            info:{"count": result.length},
            result: result
        })
    }
    catch {
        response.status(500).json({message: error})
    }    
})

//Obtener una sola frase
server.get('/frases/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const conn = await getConnection();
        const [result] = await conn.query('SELECT * FROM frases WHERE id = ?', [id]);
        await conn.end();

        if (result.length === 0) {
            return response.status(404).json({ error: "Frase no encontrada"});
        }

        response.json({
            result: result
        })
    }
    catch {
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
    catch {
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
        catch {
            response.status(500).json({message: "Ha habido un error"})
        }
})

//Eliminar una frase
server.delete('/frases/:id', async (request, response) => {
    try {
        const conn = await getConnection();
        const [result] = await conn.query('DELETE FROM frases WHERE id = ?', [id]);                              
        await conn.end();

        response.status(200).json({
            "success": true
        })
    }
    catch {
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
    catch {
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
    catch {
        response.status(500).json({message: error})
    }    
})