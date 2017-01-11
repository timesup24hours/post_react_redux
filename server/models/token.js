import mongoose, { Schema } from 'mongoose'
import crypto from 'crypto'
import User from './user'

const Token = new Schema({
   userid : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   token: {type: String, required: true},
   createdAt: {type: Date, required: true, default: Date.now, expires: '4h'}
})


Token.methods.createVerificationToken = async function (userid, email) {
  const verificationToken = this
  const seed = await crypto.randomBytes(20)
  const token = await crypto.createHash('sha256').update(seed + email).digest('hex')

  verificationToken.set('userid', userid)
  verificationToken.set('token', token)

  await verificationToken.save()

  return token
}

Token.statics.verifyUser = function(token, done) {
   this.findOne({token: token}, function (err, doc){
      if(err) return done(err)
      if(doc) {
        User.findOne({ _id: doc.userid }, function (err, user) {
          if(err) return done(err)
          if(user) {
            user.local.verified = true
            user.save(function(err) {
              if(err) return done(err)
              return done(null, { success: 'Your account has been verified!' })
            })
          } else {
            return done({ err: 'User has been deleted!' })
          }
        })
      } else {
        return done({ err: 'Token is expired, please use the link below to resend the verification email!' })
      }

   })
}

export default mongoose.model('Token', Token)
