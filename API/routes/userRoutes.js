let express = require("express");
let router = express.Router();
const userController = require('../controllers/userController');

// Route pour vérifier les informations de l'utilisateur (connexion)
router.post("/checkUser", userController.checkUser);

// Route pour récupérer un utilisateur spécifique
router.get("/getUserById", userController.getUser);

// Route pour récupérer tous les utilisateurs
router.get("/getUser", userController.getUser);

module.exports = router;
