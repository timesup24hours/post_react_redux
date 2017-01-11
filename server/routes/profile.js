import express from 'express'
const router = express.Router()
import * as profile from '../controllers/profile'
import multer from 'multer'
const upload = multer({ dest: 'public/uploads/images/temp' })
import requireAuth from '../middlewares/authenticate'

router.put('/changeInfo', requireAuth, profile.changeInfo);

router.post('/upload_avatar', requireAuth, upload.single('file'), profile.uploadAvatar);

router.put('/updateInfo', requireAuth, profile.updateInfo);

router.post('/upload_avatar_dataurl', requireAuth, upload.single('file'), profile.uploadDataUrl)

module.exports = router;
// upload.single('avatar')
