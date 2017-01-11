import express from 'express'
const router = express.Router()
import requireAuth from '../middlewares/authenticate.js'
import * as CommentControllers from '../controllers/comment'

router.post('/', requireAuth, CommentControllers.addComment)

router.get('/', CommentControllers.getAllCommentByPostId)

router.delete('/delete_comment/:id', requireAuth, CommentControllers.deleteComment)

module.exports = router
