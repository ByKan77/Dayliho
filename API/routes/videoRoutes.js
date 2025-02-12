let express = require("express");
let router = express.Router();
const videoController = require('../controllers/videoController');
const middleware = require('../middlewares/middleware');

router.get("/getVideos", videoController.getVideos);
router.post("/addSeance", middleware.authentification, videoController.addSeance);
router.post("/bookSeance/:id_utilisateur/:id_seance", videoController.bookSeance);
router.get("/getBookedSeances/:id_utilisateur", videoController.getBookedSeances);

module.exports = router;
