let pool = require('../database.js');

// Récupère un utilisateur par email
async function getUserByEmail(email) {
    try {
        let conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM utilisateur WHERE email = ?", [email]);
        conn.release();
        return rows[0]; // Retourne le premier utilisateur trouvé
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur par email:", error);
        throw error; // On propage l'erreur pour la gérer au niveau du contrôleur
    }
}

// Récupère un utilisateur par ID
async function getUserById(userId) {
    try {
        let conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM utilisateur WHERE id = ?", [userId]);
        conn.release();
        return rows[0]; // Si l'utilisateur n'existe pas, `rows[0]` sera `undefined`
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur par ID:", error);
        throw error; // On propage l'erreur pour la gérer au niveau du contrôleur
    }
}

// Récupère tous les utilisateurs
async function getAllUsers() {
    try {
        let conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM utilisateur");
        conn.release();
        return rows;
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        throw error; // On propage l'erreur
    }
}

// Met à jour le mot de passe de l'utilisateur
async function updatePassword(id, nouveauMdp) {
    try {
        let conn = await pool.getConnection();
        const result = await conn.query("UPDATE utilisateur SET mot_de_passe = ? WHERE id = ?", [nouveauMdp, id]);
        conn.release();
        return result.affectedRows > 0; // Retourne true si la mise à jour a réussi
    } catch (error) {
        console.error("Erreur lors de la mise à jour du mot de passe:", error);
        throw error; // On propage l'erreur
    }
}

// Supprimer un utilisateur par ID
async function deleteUserById(userId) {
    try {
        let conn = await pool.getConnection();
        const result = await conn.query("DELETE FROM utilisateur WHERE id = ?", [userId]);
        conn.release();

        // Si aucune ligne n'est affectée, cela signifie que l'utilisateur n'a pas été trouvé
        if (result.affectedRows === 0) {
            return { success: false, message: "Utilisateur non trouvé." };
        }

        return { success: true, message: "Utilisateur supprimé avec succès." };
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
        throw error; // On propage l'erreur
    }
}

module.exports = { getUserByEmail, getUserById, getAllUsers, updatePassword, deleteUserById };
