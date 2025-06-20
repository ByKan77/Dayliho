const notationModel = require('../models/notationModel');

// Ajouter une notation
async function addNotation(req, res) {
    try {
        console.log("Données reçues:", req.body);
        console.log("Utilisateur:", req.user);
        
        const { idSeance, note, commentaire } = req.body;
        const idUtilisateur = req.user.id;

        console.log("ID Séance:", idSeance);
        console.log("Note:", note);
        console.log("Commentaire:", commentaire);
        console.log("ID Utilisateur:", idUtilisateur);

        // Vérifier si l'utilisateur a déjà noté cette séance
        const existingNotation = await notationModel.checkUserNotation(idSeance, idUtilisateur);
        if (existingNotation) {
            return res.status(409).json({ 
                success: false, 
                message: "Vous avez déjà noté cette séance." 
            });
        }

        const result = await notationModel.addNotation(idSeance, idUtilisateur, note, commentaire);
        console.log("Résultat de l'ajout:", result);
        
        res.status(201).json({ 
            success: true, 
            message: "Notation ajoutée avec succès" 
        });
    } catch (error) {
        console.error("Erreur lors de l'ajout de la notation:", error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur serveur: ' + error.message 
        });
    }
}

// Récupérer les notations d'une séance
async function getNotationsBySeance(req, res) {
    try {
        const { idSeance } = req.params;
        const notations = await notationModel.getNotationsBySeance(idSeance);
        
        res.status(200).json(notations);
    } catch (error) {
        console.error("Erreur lors de la récupération des notations:", error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur serveur.' 
        });
    }
}

// Récupérer les séances que l'utilisateur peut noter
async function getNotableSeances(req, res) {
    try {
        const idUtilisateur = req.user.id;
        const seances = await notationModel.getNotableSeances(idUtilisateur);
        
        res.status(200).json(seances);
    } catch (error) {
        console.error("Erreur lors de la récupération des séances:", error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur serveur.' 
        });
    }
}

// Vérifier si un utilisateur peut noter une séance
async function canUserNotate(req, res) {
    try {
        const { idSeance } = req.params;
        const idUtilisateur = req.user.id;
        
        const existingNotation = await notationModel.checkUserNotation(idSeance, idUtilisateur);
        const canNotate = !existingNotation;
        
        res.status(200).json({ 
            success: true, 
            canNotate: canNotate 
        });
    } catch (error) {
        console.error("Erreur lors de la vérification:", error);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur serveur.' 
        });
    }
}

module.exports = { 
    addNotation, 
    getNotationsBySeance, 
    getNotableSeances,
    canUserNotate 
}; 