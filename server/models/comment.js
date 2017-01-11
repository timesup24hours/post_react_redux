import mongoose, { Schema } from 'mongoose'

const Comment = new Schema({
  content: { type: String, required: true },
  postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now }
});


export default mongoose.model('Comment', Comment)
