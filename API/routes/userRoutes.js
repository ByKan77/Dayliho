let express = require("express");
let router = express.Router();
const userController = require('../controllers/userController');

// Route pour le logi,
router.post("/checkUser", userController.checkUser);

// Route pour récupérer les infos de l'utilisateur
router.get("/getUserById", userController.getUser);

// Route pour récupérer un utilisateur spécifique
router.get("/getUsers", userController.getUsers);



module.exports = router;
