const express = require('express')
const applicantController = require('../controller/applicant.controller')
const AuthUser = require('../middleware/auth')
const router = express.Router()

router.get("/",AuthUser, applicantController.getAllApplicants);
router.post("/addApplicant", AuthUser, applicantController.addApplicant);
router.delete('/deleteApplicant/:id',AuthUser,applicantController.deleteApplicant)

module.exports = router