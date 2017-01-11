import express from 'express'
const router = express.Router();
import * as chatController from '../controllers/chat'
import requireAuth from '../middlewares/authenticate.js'

router.get('/chat_history', requireAuth, chatController.getChatHistory)

export default router
