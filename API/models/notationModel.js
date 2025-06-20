let pool = require('../database.js');

// Ajouter une nouvelle notation
async function addNotation(idSeance, idUtilisateur, note, commentaire) {
    let conn = await pool.getConnection();
    const query = "INSERT INTO notation (idSeance, idUtilisateur, note, commentaire) VALUES (?, ?, ?, ?)";
    const result = await conn.query(query, [idSeance, idUtilisateur, note, commentaire]);
    conn.release();
    return result;
}

// Récupérer toutes les notations d'une séance
async function getNotationsBySeance(idSeance) {
    let conn = await pool.getConnection();
    const query = `
        SELECT n.*, u.nom, u.prenom 
        FROM notation n 
        JOIN utilisateur u ON n.idUtilisateur = u.id 
        WHERE n.idSeance = ?
    `;
    const rows = await conn.query(query, [idSeance]);
    conn.release();
    return rows;
}

// Vérifier si un utilisateur a déjà noté une séance
async function checkUserNotation(idSeance, idUtilisateur) {
    let conn = await pool.getConnection();
    const query = "SELECT * FROM notation WHERE idSeance = ? AND idUtilisateur = ?";
    const rows = await conn.query(query, [idSeance, idUtilisateur]);
    conn.release();
    return rows[0]; // Retourne la notation si elle existe, sinon null
}

// Récupérer les séances que l'utilisateur peut noter (créées par d'autres utilisateurs)
async function getNotableSeances(idUtilisateur) {
    let conn = await pool.getConnection();
    console.log('Recherche des séances pour utilisateur:', idUtilisateur);
    
    const query = `
        SELECT s.*, u.nom as createur_nom, u.prenom as createur_prenom
        FROM seance s 
        JOIN utilisateur u ON s.id_utilisateur = u.id 
        WHERE s.id_utilisateur != ?
        AND s.id NOT IN (
            SELECT idSeance FROM notation WHERE idUtilisateur = ?
        )
    `;
    const rows = await conn.query(query, [idUtilisateur, idUtilisateur]);
    console.log('Séances trouvées:', rows.length);
    conn.release();
    return rows;
}

// Calculer la note moyenne d'une séance
async function getAverageNote(idSeance) {
    let conn = await pool.getConnection();
    const query = "SELECT AVG(note) as moyenne FROM notation WHERE idSeance = ?";
    const rows = await conn.query(query, [idSeance]);
    conn.release();
    return rows[0].moyenne || 0;
}

module.exports = { 
    addNotation, 
    getNotationsBySeance, 
    checkUserNotation, 
    getNotableSeances,
    getAverageNote 
}; 