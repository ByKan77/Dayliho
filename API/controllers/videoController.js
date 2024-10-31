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

async function addVideo(req, res) {
    try {
        const { title, description, auteur, date } = req.body;
        const videoBuffer = req.file.buffer; // Récupère le fichier vidéo en tant que buffer

        const result = await videoModel.pushNewVideo(title, description, auteur, date, videoBuffer);
        res.status(201).json({ success: true, message: "Vidéo ajoutée avec succès", result });
    } catch (error) {
        console.error("Erreur lors de l'ajout de la vidéo:", error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
}

module.exports = { getVideos, addVideo };
