const express = require('express')
const controllers = require('../controller/controller')

const router = express.Router()
router.post('/subscribe' ,controllers.subscribe )
router.post('/contactus' ,controllers.contactUs )
router.post('/enroll' ,controllers.enroll)
router.post('/eventreg' , controllers.eventRegistration)

module.exports = router