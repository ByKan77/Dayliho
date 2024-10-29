let express = require("express");
let router = express.Router();
const videoController = require('../controllers/videoController');

router.get("/getVideos", videoController.getVideos);
router.post("/addVideo", videoController.addVideo);

module.exports = router;
