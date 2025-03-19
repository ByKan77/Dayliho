const videoModel = require('../models/videoModel');

async function getVideos(req, res) {
    try {
        const videos = await videoModel.getAllVideos();
        res.status(200).json(videos);
    } catch (error) {
        console.error("Erreur lors de la récupération des vidéos:", error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
}

const multer = require('multer');
const upload = multer();

async function addSeance(req, res) {
    try {
        console.log(req.user)
        console.log(req.body);
        
        const {titre, description, dateDebut, dateFin, lieu, nombrePlaces, id_utilisateur } = req.body;
        
        console.log(typeof(id_utilisateur));
        
        const result = await videoModel.pushNewSeance(titre, description, dateDebut, dateFin, lieu, parseInt(nombrePlaces), parseInt(id_utilisateur));
        
        res.status(201).json({ success: true, message: "Séance ajoutée avec succès"});
    } catch (error) {
        console.error("Erreur lors de l'ajout de la Séance:", error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
}

async function bookSeance(req, res) {    
    console.log(req.params);

    try {
        const { id_utilisateur, id_seance } = req.params;

        // Vérifie si la réservation existe déjà
        const reservationExists = await videoModel.checkIfReservationExists(id_utilisateur, id_seance);

        if (reservationExists) {
            return res.status(409).json({ success: false, message: "Cette séance est déjà réservée." });
        }

        // Si elle n'existe pas, on la crée
        const result = await videoModel.bookSeance(id_utilisateur, id_seance);

        res.status(201).json({ success: true, message: "Réservation effectuée avec succès." });
    } catch (err) {
        console.error("Erreur lors de la réservation de la Séance:", err);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
}



async function getBookedSeances(req, res) {
    const id_utilisateur = req.params;
    try {        
        const videos = await videoModel.getBookedSeances(id_utilisateur.id_utilisateur);
        res.status(200).json(videos);
    } catch (error) {
        console.error("Erreur lors de la récupération des vidéos:", error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
}

async function getBookedSeancesDetailed(req, res) {
    try {
        const id_utilisateur = req.params.id_utilisateur;
        const seances = await videoModel.getBookedSeancesDetailed(id_utilisateur);
        res.json(seances);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function deleteReservation(req, res) {
    try {
        const { id_utilisateur, id_seance } = req.params;
        const result = await videoModel.deleteReservation(id_utilisateur, id_seance);
        res.status(200).json({ success: true, message: "Réservation supprimée avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression de la réservation:", error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
}

module.exports = { getVideos, addSeance, bookSeance, getBookedSeances, getBookedSeancesDetailed, deleteReservation };

