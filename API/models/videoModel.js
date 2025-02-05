let pool = require('../database.js');

async function getAllVideos() {
    let conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM seancedesport");
    conn.release();
    return rows;
}

async function pushNewSeance(titre, description, dateDebut, dateFin, lieu, nombrePlaces, id_sport, id_utilisateur) { 
    let conn = await pool.getConnection();
    const query = "INSERT INTO seancedesport (titre, description, dateDebut, dateFin, lieu, nombrePlaces, id_sport, id_utilisateur) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const result = await conn.query(query, [titre, description, dateDebut, dateFin, lieu, nombrePlaces, id_sport, id_utilisateur]);
    conn.release();
    return result;
}

async function bookSeance(id_utilisateur, id_seance) { 
    let conn = await pool.getConnection();
    const query = "INSERT INTO participant (id_seance, id_utilisateur) VALUES (?, ?)";
    const result = await conn.query(query, [id_seance, id_utilisateur]);
    conn.release();
    return result;
}

module.exports = {getAllVideos, pushNewSeance, bookSeance};
