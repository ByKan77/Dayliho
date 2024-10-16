let pool = require('../database.js');

// Récupère un utilisateur par email
async function getUserByEmail(email) {
    let conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM utilisateur WHERE email = ?", [email]);
    conn.release();
    return rows[0]; // On retourne le premier utilisateur trouvé (supposé unique)
}

// Récupère un utilisateur par ID
async function getUserById(id) {
    let conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM utilisateur WHERE id = ?", [id]);
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

module.exports = { getUserByEmail, getUserById, getAllUsers };
