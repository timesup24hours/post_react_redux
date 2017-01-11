import express from 'express'
const router = express.Router()

import Auth from './auth'
import Post from './post'
import Comment from './comment'
import Profile from './profile'
import Chat from './chat'
import Contact from './contact'

router.use('/', Auth)
router.use('/post', Post)
router.use('/comment', Comment)
router.use('/profile', Profile)
router.use('/chat', Chat)
router.use('/contact', Contact)

export default router
