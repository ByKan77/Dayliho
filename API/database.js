const mariadb = require('mariadb');
const pool = mariadb.createPool({ 
    host: 'localhost',
    user:'dorian',
    password: 'Rootroot123.',
    database: 'dayliho',
});

module.exports = pool;