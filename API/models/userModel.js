let pool = require('../database.js');

// Récupère un utilisateur par email
async function getUserByEmail(email) {
    let conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM utilisateur WHERE email = ?", [email]);
    conn.release();
    return rows[0]; // On retourne le premier utilisateur trouvé (supposé unique)
}

// Récupère un utilisateur par ID
async function getUserById(userId) {
    let conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM utilisateur WHERE id = ?", [userId]);
    conn.release();
    return rows[0];
}

// Récupère tous les utilisateurs
async function getAllUsers() {
    let conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM utilisateur");
    conn.release();
    return rows;
}

// Met à jour le mot de passe de l'utilisateur
async function updatePassword(id, nouveauMdp) {
    let conn = await pool.getConnection();
    const result = await conn.query("UPDATE utilisateur SET mot_de_passe = ? WHERE id = ?", [nouveauMdp, id]);
    conn.release();
    return result.affectedRows > 0; // Retourne true si la mise à jour a réussi
}

// Supprime l'utilisateur par ID
async function deleteUserById(userId, role) {
    let conn;
    try {
        conn = await pool.getConnection();

        const [user] = await conn.query("SELECT * FROM utilisateur WHERE id = ?", [userId]); // Vérif que l'utilisateur avec l'id spécifié existe bien

        if (!user) { // Si non alors..
            throw new Error('Utilisateur non trouvé');
        }
        if (role === 'coach') { // SI c'est un coach on doit supprimer ses séances de sport mais avant les inscriptions à ses séances, dans l'autre sens ça ne marche pas

            await conn.query("DELETE FROM reservation WHERE id_seance IN (SELECT id FROM seance WHERE id_utilisateur = ?)", [userId]); // Supprime les inscriptions aux séances du coach

            await conn.query("DELETE FROM seance WHERE id_utilisateur = ?", [userId]); // Puis supprime la / les séance(s)
        }

        // Pour un utilisateur non coach
        const result = await conn.query("DELETE FROM utilisateur WHERE id = ?", [userId]);

        return result;

    } catch (error) {
        console.error('Erreur dans le modèle de suppression de l\'utilisateur:', error);
        throw error; 
    } finally {
        if (conn) conn.release();
    }
}

// Récupère les inscriptions à sa séance d'un utilisateur
async function getUserSub(userId) {
    let conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM reservation WHERE id_utilisateur = ?", [userId]);
    conn.release();
    return rows[0];
}



module.exports = { getUserByEmail, getUserById, getAllUsers, updatePassword, deleteUserById, getUserSub };  // Exporte les fonctions pour les utiliser dans les controllers
