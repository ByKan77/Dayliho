let express = require("express");
let router = express.Router();
const videoController = require('../controllers/videoController');

const multer = require('multer');
const upload = multer(); 

router.get("/getVideos", videoController.getVideos);
router.post("/addVideo", upload.single('videoFile'), videoController.addVideo);

module.exports = router;
