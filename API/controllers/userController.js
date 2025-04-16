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
            let token = jwt.sign({ email: utilisateur.email, id: utilisateur.id }, 'secretKey', { expiresIn: '1h' });
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

async function banUser(req, res) {
    const userId = req.params.id;
    console.log("2 - ID utilisateur reçu pour blocage / déblocage:", userId);  // Pour déboguer
    
    try {
        // Vérifie si l'utilisateur est déjà bloqué ou non, pour savoir s'il faut envoyer 0 ou 1 en paramètre de "estBloque"
        const utilisateur = await userModel.getUserById(userId);

        if (!utilisateur) {
            console.log("Utilisateur introuvable !");
        }

        if(utilisateur.estBloque === 0) { // Si l'utilisateur n'est pas bloqué
            var etatCompte = 1; // On le bloque
        } else {
            var etatCompte = 0; // Sinon on le débloque
        }
        
        const result = await userModel.banUserById(userId, etatCompte); // Appel le model pour bloquer ou débloquer l'utilisateur
      
        if (result.affectedRows === 0) { // Si y'a pas d'utilisateur avec cet id
            console.log('Echec de la mise à jour - aucune ligne affectée pour l\'ID:', userId);
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        console.log('Utilisateur bloqué / débloqué avec succès pour l\'ID:', userId);
        res.status(200).json({ message: 'Utilisateur bloqué / débloqué avec succès' });

    } catch (error) {
        console.error('Erreur lors du blocage / déblocage de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

async function deleteUser(req, res) {
    const userId = req.params.id;
    const { role } = req.body;  // Récupère le role envoyé

    try {
        const result = await userModel.deleteUserById(userId, role); // Appel le model pour supprimer l'utilisateur

        if (result.affectedRows === 0) { // Si y'a pas d'utilisateur à cet id
            console.log('Echec de la suppression - aucune ligne affectée pour l\'ID:', userId);
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        console.log('Utilisateur supprimé avec succès pour l\'ID:', userId);
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });

    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

async function updatePassword(req, res) {
    try {
        const { userId, oldPassword, newPassword } = req.body;
        const utilisateur = await userModel.getUserById(userId);

        if (!utilisateur) {
            return res.status(404).json({ success: false, message: 'Utilisateur introuvable.' });
        }

        const mdpValide = await bcrypt.compare(oldPassword, utilisateur.mot_de_passe);
        if (!mdpValide) {
            return res.status(401).json({ success: false, message: 'Ancien mot de passe incorrect.' });
        }

        const hashNouveau = await bcrypt.hash(newPassword, 10);
        const success = await userModel.updatePassword(userId, hashNouveau);

        if (success) {
            console.log('Mot de passe mis à jour avec succès pour l\'utilisateur ID:', userId);
            return res.status(200).json({ success: true, message: 'Mot de passe mis à jour avec succès.' });
        } else {
            console.log('Echec de la mise à jour du mot de passe - aucune ligne affectée pour l\'ID:', userId);
            return res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour.' });
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du mot de passe:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
}

module.exports = { checkUser, getUser, getUsers, verifConnexion, deleteUser, getUserByEmail, updatePassword, banUser };
