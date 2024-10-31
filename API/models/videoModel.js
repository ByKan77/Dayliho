let pool = require('../database.js');

async function getAllVideos() {
    let conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM seancedesport");
    conn.release();
    return rows;
}

async function pushNewSeance(titre, description, dateDebut, dateFin, lieu, nombrePlaces, id_sport, id_utilisateur, videoBuffer) { 
    let conn = await pool.getConnection();
    const query = "INSERT INTO seancedesport (titre, description, dateDebut, dateFin, lieu, nombrePlaces, id_sport, id_utilisateur, video) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const result = await conn.query(query, [titre, description, dateDebut, dateFin, lieu, nombrePlaces, id_sport, id_utilisateur, videoBuffer]);
    conn.release();
    return result;
}

module.exports = { getAllVideos, pushNewSeance };
