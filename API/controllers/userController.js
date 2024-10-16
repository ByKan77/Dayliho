const userModel = require('../models/userModel');

// Fonction pour vérifier l'utilisateur lors de la connexion
async function checkUser(req, res) {
    const { email, mot_de_passe } = req.body;

    try {
        // Utilise le modèle pour récupérer l'utilisateur par email
        const utilisateur = await userModel.getUserByEmail(email);

        if (utilisateur && utilisateur.mot_de_passe === mot_de_passe) {
            // Si l'utilisateur existe et que le mot de passe est correct
            res.status(200).json({ success: true, user_id: utilisateur.id });
        } else {
            // Si l'utilisateur n'est pas trouvé ou que le mot de passe est incorrect
            res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
        }
    } catch (error) {
        console.error("Erreur lors de la vérification des informations utilisateur:", error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
}

// Fonction pour récupérer un utilisateur spécifique
async function getUser(req, res) {
    const userId = req.query.id;
    console.log("User ID reçu:", userId);  // Pour déboguer

    try {
        if (userId) {
            const utilisateur = await userModel.getUserById(userId); // Récupération de l'utilisateur par ID
            if (utilisateur) {
                res.status(200).json(utilisateur);
            } else {
                res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
            }
        } else {
            res.status(400).json({ success: false, message: "ID utilisateur manquant" });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
}


// Fonction pour récupérer tous les utilisateurs
async function getUsers(req, res) {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
}

module.exports = { checkUser, getUser, getUsers };
