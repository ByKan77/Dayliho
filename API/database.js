const mariadb = require('mariadb');
require('dotenv').config()


const pool = mariadb.createPool({ 
    host: 'localhost',
    user: 'dayliho_admin',
    password: 'daylidmin',
    database: 'dayliho',
});

module.exports = pool;