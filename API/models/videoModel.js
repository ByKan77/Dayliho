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

async function deleteReservation(id_utilisateur, id_seance) {
    let conn = await pool.getConnection();
    const query = "DELETE FROM reservation WHERE id_utilisateur = ? AND id_seance = ?";
    const result = await conn.query(query, [id_utilisateur, id_seance]);
    conn.release();
    return result;
}

async function getSeanceById(id) {
    let conn = await pool.getConnection();
    try {
        console.log('getSeanceById appelé avec ID:', id, 'Type:', typeof id);
        const query = "SELECT * FROM seance WHERE id = ?";
        const rows = await conn.query(query, [parseInt(id)]);
        console.log('Résultat de la requête:', rows);
        // rows peut être un tableau ou un objet selon le driver
        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0];
        } else if (rows && rows[0] && Array.isArray(rows[0]) && rows[0].length > 0) {
            return rows[0][0];
        } else {
            return null;
        }
    } finally {
        conn.release();
    }
}

async function deleteSeance(id) {
    let conn = await pool.getConnection();
    try {
        // Commencer une transaction
        await conn.beginTransaction();
        
        // Supprimer d'abord les réservations associées
        const deleteReservationsQuery = "DELETE FROM reservation WHERE id_seance = ?";
        await conn.query(deleteReservationsQuery, [id]);
        
        // Ensuite supprimer la séance
        const deleteSeanceQuery = "DELETE FROM seance WHERE id = ?";
        const result = await conn.query(deleteSeanceQuery, [id]);
        
        // Valider la transaction
        await conn.commit();
        
        return result;
    } catch (error) {
        // En cas d'erreur, annuler la transaction
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

module.exports = {getAllVideos, pushNewSeance, bookSeance, getBookedSeances, getBookedSeancesDetailed, checkIfReservationExists, deleteReservation, deleteSeance, getSeanceById};