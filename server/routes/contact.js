import express from 'express'
const router = express.Router()

import * as contactControllers from '../controllers/contact'

router.post('/send_contact_email', contactControllers.sendContactEmail)

module.exports = router
// upload.single('avatar')
