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
async function deleteUserById(userId) {
    let conn;
    try {
        conn = await pool.getConnection();

        // Supprimer l'utilisateur
        const result = await conn.query("DELETE FROM utilisateur WHERE id = ?", [userId]);

        // Retourner le résultat de la suppression
        return result;

    } catch (error) {
        console.error('Erreur dans le modèle de suppression de l\'utilisateur:', error);
        throw error; // Relancer l'erreur pour être capturée par le controller
    } finally {
        if (conn) conn.release();
    }
}


module.exports = { getUserByEmail, getUserById, getAllUsers, updatePassword, deleteUserById };
