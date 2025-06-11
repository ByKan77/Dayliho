let express = require("express");
let router = express.Router();
const videoController = require('../controllers/videoController');
const middleware = require('../middlewares/middleware');

router.get("/getVideos", videoController.getVideos);
router.post("/addSeance", middleware.authentification, videoController.addSeance);
router.put("/updateSeance/:id", middleware.authentification, videoController.updateSeance);
router.post("/bookSeance/:id_utilisateur/:id_seance", videoController.bookSeance);
router.get("/getBookedSeances/:id_utilisateur", videoController.getBookedSeancesDetailed);
router.delete("/deleteReservation/:id_utilisateur/:id_seance", videoController.deleteReservation);

module.exports = router;
