const express = require('express')
const documentController = require('../controller/document.controller')
const router = express.Router()

router.post("/", documentController.getAllDocuments);
router.post("/addDocument", documentController.addDocuments);
router.delete("/deleteDocument/:id",documentController.deleteDocument);

module.exports = router