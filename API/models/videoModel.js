let pool = require('../database.js');

async function getAllVideos() {
    let conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM seance");
    conn.release();
    return rows;
}

async function pushNewSeance(titre, description, dateDebut, dateFin, lieu, nombrePlaces, id_utilisateur) { 
    let conn = await pool.getConnection();
    const query = "INSERT INTO seance (titre, description, dateDebut, dateFin, lieu, nombrePlaces, id_utilisateur) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const result = await conn.query(query, [titre, description, dateDebut, dateFin, lieu, nombrePlaces, id_utilisateur]);
    conn.release();
    return result;
}

async function bookSeance(id_utilisateur, id_seance) { 
    let conn = await pool.getConnection();
    const query = "INSERT INTO reservation (id_seance, id_utilisateur) VALUES (?, ?)";
    const result = await conn.query(query, [id_seance, id_utilisateur]);
    conn.release();
    return result;
}

async function getBookedSeances(id_utilisateur) {
    console.log(id_utilisateur);
    
    let conn = await pool.getConnection();
    const rows = await conn.query("SELECT id_seance FROM `reservation` WHERE id_utilisateur= ? GROUP BY id_seance", [id_utilisateur]);
    conn.release();
    return rows;
}

async function getBookedSeancesDetailed(id_utilisateur) {
    let conn = await pool.getConnection();
    const seanceIds = await conn.query("SELECT id_seance FROM `reservation` WHERE id_utilisateur= ? GROUP BY id_seance", [id_utilisateur]);
    if (seanceIds.length === 0) {
        conn.release();
        return [];
    }
    const ids = seanceIds.map(row => row.id_seance);
    const query = "SELECT * FROM seance WHERE id IN (?)";
    const seances = await conn.query(query, [ids]);
    conn.release();
    return seances;
}

async function checkIfReservationExists(id_utilisateur, id_seance) {
    let conn = await pool.getConnection();
    const query = "SELECT COUNT(*) as count FROM reservation WHERE id_utilisateur = ? AND id_seance = ?";
    const [rows] = await conn.query(query, [id_utilisateur, id_seance]);
    conn.release();
    
    return rows.count > 0;
}


module.exports = {getAllVideos, pushNewSeance, bookSeance, getBookedSeances, getBookedSeancesDetailed, checkIfReservationExists};
