let pool = require('../database.js');

async function getAllVideos() {
    let conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM video");
    conn.release();
    return rows;
}

module.exports = { getAllVideos };
