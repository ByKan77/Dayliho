const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fonction pour vérifier l'utilisateur lors de la connexion
async function checkUser(req, res) {
    const { email, mot_de_passe } = req.body;

    try {
        // Utilise le modèle pour récupérer l'utilisateur par email
        const utilisateur = await userModel.getUserByEmail(email);
        console.log(utilisateur.id)
        console.log(utilisateur.mot_de_passe, mot_de_passe);
        if (utilisateur && bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe)) {
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



// Fonction pour changer le mot de passe
async function changePassword(req, res) {
    const { userId, ancienMdp, nouveauMdp, confirmNouveauMdp } = req.body;

    try {
        // Vérifie que les nouveaux mots de passe correspondent
        if (nouveauMdp !== confirmNouveauMdp) {
            return res.status(400).json({ success: false, message: 'Les nouveaux mots de passe ne correspondent pas.' });
        }

        // Récupère l'utilisateur par son ID
        const utilisateur = await userModel.getUserById(userId);

        // Vérifie si l'ancien mot de passe est correct
        const passwordMatch = await bcrypt.compare(ancienMdp, utilisateur.mot_de_passe);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Mot de passe actuel incorrect.' });
        }

        // Hash le nouveau mot de passe
        const hashedPassword = await bcrypt.hash(nouveauMdp, 10);

        // Met à jour le mot de passe dans la base de données
        const updateSuccess = await userModel.updatePassword(userId, hashedPassword);

        if (updateSuccess) {
            res.status(200).json({ success: true, message: 'Mot de passe changé avec succès.' });
        } else {
            res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour du mot de passe.' });
        }
    } catch (error) {
        console.error("Erreur lors du changement de mot de passe:", error);
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


// Récupère les Utilisateurs inscrit à une séance
async function getUserSub(req, res) {

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






module.exports = { checkUser, getUser, getUsers, changePassword, verifConnexion, deleteUser };
