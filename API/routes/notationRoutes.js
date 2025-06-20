let express = require("express");
let router = express.Router();
const notationController = require('../controllers/notationController');
const middleware = require('../middlewares/middleware');

// Route pour ajouter une notation (nécessite authentification)
router.post("/addNotation", middleware.authentification, notationController.addNotation);

// Route pour récupérer les notations d'une séance
router.get("/getNotationsBySeance/:idSeance", notationController.getNotationsBySeance);

// Route pour récupérer les séances passées que l'utilisateur peut noter
router.get("/getPastSeancesForNotation", middleware.authentification, notationController.getPastSeancesForNotation);

// Route pour vérifier si un utilisateur peut noter une séance
router.get("/canUserNotate/:idSeance", middleware.authentification, notationController.canUserNotate);

module.exports = router; 