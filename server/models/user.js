import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const User = new Schema({
  local: {
    username: { type: String, unique: true },
    password: { type: String },
    email: { type: String, unique: true },
    // authToken: { type: String, required:true, unique: true },
    verified: { type: Boolean },
    nick_name: { type: String },
    avatar_name: { type: String }
    // admin: Boolean,
    // location: String,
    // meta: {
    //   age: Number,
    //   website: String
    // },
  },
  facebook : {
    id: { type: String },
    token: { type: String }
  },
  google : {
    id: { type: String },
    token: { type: String }
  },
  created_at: { type: Date, default: Date.now, required: true }
})

User.pre('save', function(next) {
  let user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('local.password')) return next()

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err)

    // hash the password using our new salt
    bcrypt.hash(user.local.password, salt, function(err, hash) {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      user.local.password = hash
      next()
    })
  })
})

User.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.local.password, function(err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

User.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export default mongoose.model('User', User)
