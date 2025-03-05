const mariadb = require('mariadb');
const pool = mariadb.createPool({ 
    host: 'localhost',
    user:'dorian',
    password: 'root',
    database: 'dayliho',
});

module.exports = pool;