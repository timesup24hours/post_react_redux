import Comment from '../models/comment'
import Post from '../models/post'
import { asyncRequest } from '../utils'


export const addComment = asyncRequest(async (req, res) => {
  if(!req.body.content) {
    res.json({ err: { content: 'Content is required'} })
    return
  }
  if(!req.body.postedBy) {
    res.json({ err: { postedBy: 'User Name is required'} })
    return
  }
  if(!req.body.postId) {
    res.json({ err: { postedBy: 'Login is required'} })
    return
  }

  const post = await Post.findOne({ _id: req.body.postId}).exec()

  if(!post) {
   res.json({ err: 'This post has already been deleted'})
   return
  }

  const comment = new Comment({
    content: req.body.content,
    postId: req.body.postId,
    postedBy: req.body.postedBy
  })

  await comment.save()

  res.json({ success: 'Commented', comment: comment })

}) // addComment

export const getAllCommentByPostId = asyncRequest(async (req, res) => {
  if(!req.query.id) {
    res.json({ err: 'This post has already been deleted' })
    return
  }

  const comment = await Comment.find({ postId: req.query.id })
  .populate('postedBy', 'local.username local.avatar_name local.nick_name')
  .exec()
  if(!comment) {
    res.status(400).json({ err : 'This post has already been deleted' })
    return
  }
  res.status(201).json(comment)

}) // getAllCommentByPostId

export const deleteComment = asyncRequest(async (req, res) => {
  const commentId = req.params.id
  if(!commentId) {
    res.status(400).json({ error: 'fail to delete' })
    return
  }
  const deletedResult = await Comment.remove({ _id: commentId })
  res.json({ deletedResult: deletedResult })
}) // deleteComment
