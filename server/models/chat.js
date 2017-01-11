import mongoose, { Schema } from 'mongoose'

const Chat = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String },
  created_at: {type: Date, required: true, default: Date.now, expires: '4h'}
});

export default mongoose.model('Chat', Chat)
