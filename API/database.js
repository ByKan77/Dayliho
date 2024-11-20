const mariadb = require('mariadb');
const pool = mariadb.createPool({ 
    host: 'localhost',
    user:'root',
    password: '',
    database: 'dayliho',
});

module.exports = pool;