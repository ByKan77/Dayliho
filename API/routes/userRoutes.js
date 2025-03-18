let express = require("express");
let router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middlewares/middleware');
// Route pour le login
router.post("/checkUser", userController.checkUser);

// Route pour récupérer les infos de l'utilisateur
router.get("/getUserById", userController.getUser);

//Route pour récupérer les infos de l'utilisateur par son email
router.get("/getUserByEmail", userController.getUserByEmail);

// Route pour récupérer un utilisateur spécifique
router.get("/getUsers", userController.getUsers);

// Route pour le changement de mot de passe
router.post("/changePassword", userController.changePassword);

// Route pour la navbar
router.get("/navbar", middleware.authentification, userController.verifConnexion);

router.get("/verifUser", middleware.authentification, userController.verifConnexion);

// Route pour supprimer un utilisateur
router.delete('/deleteUser/:id', userController.deleteUser);



module.exports = router;
