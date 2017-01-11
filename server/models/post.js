import mongoose, { Schema } from 'mongoose'

const Post = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  // postedBy: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});


export default mongoose.model('Post', Post)
