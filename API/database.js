const mariadb = require('mariadb');
require('dotenv').config();  // Charger les variables depuis le fichier .env

const pool = mariadb.createPool({ 
    host: process.env.DB_HOST,  
    user: process.env.DB_USER,  
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
});

module.exports = pool;
