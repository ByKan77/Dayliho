let pool = require('../database.js');

async function getAllVideos() {
    let conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM video");
    conn.release();
    return rows;
}

async function pushNewVideo(title, description, auteur, date, fichier) {
    let conn = await pool.getConnection();
    const query = "INSERT INTO video (title, description, auteur, date, fichier) VALUES (?, ?, ?, ?, ?)";
    const result = await conn.query(query, [title, description, auteur, date, fichier]);
    conn.release();
    return result;
}

module.exports = { getAllVideos, pushNewVideo };
