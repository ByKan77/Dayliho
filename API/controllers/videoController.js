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

module.exports = { getVideos };
