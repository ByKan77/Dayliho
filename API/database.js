const mariadb = require('mariadb');
require('dotenv').config()

const pool = mariadb.createPool({ 
<<<<<<< HEAD
    host: 'localhost',
    user:'root',
    password: '',
    database: 'dayliho',
=======
    host: process.env.HOST,
    user: process.env.LOGIN,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
>>>>>>> 73124abf3c78a4774ea1f3d4efd0f5152ada0284
});

module.exports = pool;