const mariadb = require('mariadb');
require('dotenv').config()

console.log(process.env.DATABASE);

const pool = mariadb.createPool({ 
    host: process.env.HOST,
    user: process.env.LOGIN,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    allowPublicKeyRetrieval: true,
});

module.exports = pool;