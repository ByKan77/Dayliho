let express = require("express");
let router = express.Router();
const videoController = require('../controllers/videoController');
const middleware = require('../middlewares/middleware');

router.get("/getVideos", videoController.getVideos);
router.post("/addSeance", middleware.authentification, videoController.addSeance);


module.exports = router;
