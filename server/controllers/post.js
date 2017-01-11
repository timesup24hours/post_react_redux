import Post from '../models/post'
import Comment from '../models/comment'
import { asyncRequest } from '../utils'

export const addPost = asyncRequest(async (req, res) => {
  const { title, content, postedBy } = req.body
  let errors = {}
  if(title && title.length > 30) errors.title = 'Title should be less then 30 characters!'
  if(title && title.length < 10) errors.title = 'Title could not be less than 10 characters!'
  if(!title) errors.title = 'Title is required!'
  if(content && content.length < 30) errors.content = 'Content could not be less than 30 characters!'
  if(content && content.length > 4000) errors.content = 'Content should be less than 4000 characters!'
  if(!content) errors.content = 'Content is required!'
  if(!postedBy) errors.postedBy = 'Please sign in to post!'

  if(Object.keys(errors).length !== 0) {
    res.json({ errors: errors })
    return
  }

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    postedBy: req.body.postedBy
  })

  await post.save()

  res.status(201).json({ success: 'post saved', post: post })
  return

}) // addPost

export const getAllPost = asyncRequest(async (req, res) => {
  // var yesterday = new Date().setDate(new Date().getDate() - 1)
  let rightNow = new Date().getTime()
  const post = await Post.find({
      created_at: { $lt: rightNow }
    })
    .populate('postedBy', 'local.username local.avatar_name local.nick_name')
    .limit(6)
    .sort({ created_at: -1 })
    .exec()

  if(!post) {
    res.json({ err: 'there is no post!' })
    return
  }
  res.status(201).json(post)

}) // getAllPost

export const deletePost = asyncRequest(async (req, res) => {
  const postId = req.params.id
  await Post.findByIdAndRemove(postId)
  await Comment.remove(postId)

  res.json({ success: 'Post has been deleted successfully!' })
}) // deletePost

export const loadMoreOldPost = asyncRequest(async (req, res) => {
  const posts = await Post.find({
      created_at: { $lt: req.params.date }
    })
    .populate('postedBy', 'local.username local.avatar_name local.nick_name')
    .limit(8)
    .sort({ created_at: -1 })
    .exec()

  if(!posts) {
    res.json({ err: 'no more old posts!' })
    return
  }
  res.status(201).json({ posts: posts })


}) // loadMorePost

export const loadMoreNewPost = asyncRequest(async (req, res) => {
  const posts = await Post.find({
      created_at: { $gt: req.params.date }
    })
    .populate('postedBy', 'local.username local.avatar_name local.nick_name')
    .sort({ created_at: -1 })
    .exec()

  if(!posts) {
    res.json({ err: 'no more new posts!' })
    return
  }
  res.status(201).json({ posts: posts })
}) // loadMoreNewPost
