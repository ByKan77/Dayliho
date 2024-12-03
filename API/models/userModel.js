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
    let conn = await pool.getConnection();
    const rows = await conn.query("SELECT email, prenom, nom FROM utilisateur WHERE id = ?", [userId]);
    conn.release();
    return rows[0];
}

// Récupère un utilisateur par ID
async function getUserPasswordById(userId) {
    let conn = await pool.getConnection();
    const rows = await conn.query("SELECT mot_de_passe FROM utilisateur WHERE id = ?", [userId]);
    conn.release();
    return rows[0]?.mot_de_passe; // Retourne uniquement le mot de passe haché ou `undefined` si l'utilisateur n'existe pas
}

async function updatePassword(userId, hashedPassword) {
    let conn = await pool.getConnection();
    await conn.query("UPDATE utilisateur SET mot_de_passe = ? WHERE id = ?", [hashedPassword, userId]);
    conn.release();
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


module.exports = { getUserByEmail, getUserById, getAllUsers, getUserPasswordById };
