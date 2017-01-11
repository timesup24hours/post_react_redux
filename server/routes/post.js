import express from 'express'
const router = express.Router()
import * as PostControllers from '../controllers/post'
import requireAuth from '../middlewares/authenticate.js'

router.post('/', requireAuth, PostControllers.addPost)

router.get('/', PostControllers.getAllPost)

router.delete('/delete_post/:id', requireAuth, PostControllers.deletePost)

router.get('/load_more_old_post/:date', PostControllers.loadMoreOldPost)

router.get('/load_more_new_post/:date', PostControllers.loadMoreNewPost)

module.exports = router
