const express = require('express')
const controllers = require('../controller/controller')

const router = express.Router()
router.post('/subscribe' ,controllers.subscribe )
router.post('/contactus' ,controllers.contactUs )

module.exports = router