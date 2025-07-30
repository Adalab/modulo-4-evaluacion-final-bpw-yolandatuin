//Configurar el servidor
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const server = express();
const PORT = 4000;

server.use(cors());
server.use(express.json());
// server.set('view engine', 'ejs');

//Inciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor listening in http://localhost:${PORT}`)
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

//Obtener datos
server.get('/frases', async (request, response) => {
    const conn = await getConnection();
    const [result] = await conn.query('SELECT * FROM frases');
    await conn.end();

    response.json({
        info:{"count": result.length},
        result: result
    })
})