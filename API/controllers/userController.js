const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Fonction pour vérifier l'utilisateur lors de la connexion
async function checkUser(req, res) {
    const { email, mot_de_passe } = req.body;

    try {
        // Utilise le modèle pour récupérer l'utilisateur par email
        const utilisateur = await userModel.getUserByEmail(email);
        console.log(utilisateur.id)
        if (utilisateur && utilisateur.mot_de_passe === mot_de_passe) {
            let token = jwt.sign({ email: utilisateur.email, id: utilisateur.id }, 'secretKey', { expiresIn: '1h' });
            res.status(201).json({ success: true, token: token, userId: utilisateur.id }); // Inclure l'ID dans la réponse
        }
        else {
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


// Fonction pour changer mdp
async function changePassword(req, res) {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id; // Suppose que le middleware d'authentification remplit `req.user`

    try {
        // Récupérer le mot de passe haché de l'utilisateur
        const hashedPassword = await userModel.getUserPasswordById(userId);

        if (!hashedPassword) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé." });
        }

        // Comparer l'ancien mot de passe avec le mot de passe haché
        const passwordMatch = await bcrypt.compare(oldPassword, hashedPassword);

        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: "Ancien mot de passe incorrect." });
        }

        // Hacher le nouveau mot de passe
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        // Mettre à jour le mot de passe dans la base de données
        await userModel.updatePassword(userId, newHashedPassword);

        res.status(200).json({ success: true, message: "Mot de passe changé avec succès." });
    } catch (error) {
        console.error("Erreur lors du changement de mot de passe :", error);
        res.status(500).json({ success: false, message: "Erreur serveur." });
    }
}

async function verifConnexion(req,res){
    if (req.user){
        res.status(200).json({success: true, user: req.user});
    }
    else{
        res.status(401).json({success: false});
    }

}

module.exports = { checkUser, getUser, getUsers, verifConnexion, changePassword };
