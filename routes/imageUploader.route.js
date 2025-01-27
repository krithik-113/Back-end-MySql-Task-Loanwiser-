const express = require('express')
const upload = require('../middleware/multer')
const imageUploaderController = require('../controller/imageUploader.controller')
const router = express.Router()

router.post('/addImage',upload.fields([{name:"image",maxCount:1}]),imageUploaderController.addImage)
router.post("/getImages", imageUploaderController.getAllImagesData);
router.delete("/deleteImage/:id", imageUploaderController.deleteImage);
router.post("/change-status", imageUploaderController.StatusChangeForAllImages);

module.exports = router
