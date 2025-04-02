const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fonction pour vérifier l'utilisateur lors de la connexion
async function checkUser(req, res) {
    const { email, mot_de_passe } = req.body;

    try {
        // Utilise le modèle pour récupérer l'utilisateur par email
        const utilisateur = await userModel.getUserByEmail(email);
        const mdp = await bcrypt.compareSync(mot_de_passe, utilisateur.mot_de_passe)
        if (utilisateur && mdp) {
            let token = jwt.sign({ email: utilisateur.email, id: utilisateur.id, role: utilisateur.role }, 'secretKey', { expiresIn: '1h' });
            res.status(201).json({ success: true, token: token, userId: utilisateur.id, role: utilisateur.role }); // Inclure l'ID et le rôle dans la réponse
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

async function getUserByEmail(req, res) {
    const { email } = req.query;

    try {
        if (!email) {
            return res.status(400).json({ success: false, message: "Email utilisateur manquant" });
        }

        const utilisateur = await userModel.getUserByEmail(email);

        if (!utilisateur) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }

        // Ne pas renvoyer le mot de passe
        delete utilisateur.mot_de_passe;

        res.status(200).json(utilisateur);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur par email:", error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
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

async function deleteUser(req, res) {
    const userId = req.params.id;
    const { role } = req.body;  // Récupère le role envoyé

    try {
        const result = await userModel.deleteUserById(userId, role); // Appel le model pour supprimer l'utilisateur

        if (result.affectedRows === 0) { // Si y'a pas d'utilisateur à cet id
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });

    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}






module.exports = { checkUser, getUser, getUsers, verifConnexion, deleteUser, getUserByEmail};
