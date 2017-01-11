import User from '../models/user'
import Token from '../models/token'
import { asyncRequest } from '../utils'

import _ from 'lodash'
import jwt from 'jsonwebtoken'

import { config, auth as authConfig } from '../../config'

import emailTemplate from '../utils/emailTemplate/emailTemplate'
const mailgun = require('mailgun-js')({apiKey: config.MAILGUN_API_KEY, domain: config.MAILGUN_DOMAIN})

import * as sendEmail from '../utils/sendEmail'

export const isUsernameTaken = asyncRequest(async (username) => {
  // check if username already taken
  const users = await User.findOne({ 'local.username': username }).exec()
  if(users) return users.length > 0
  return false
})

export const isEmailTaken = asyncRequest(async (email) => {
  // check if email already taken
  const users = await User.findOne({ 'local.email': email }).exec()
  if(users) return users.length > 0
  return false
})

export const signup = asyncRequest( async (req, res, next)  => {
  const { username, email, password, passwordConfirm } = req.body
  let errors = {}
  if(!username) errors.username = 'Username is required'
  if(username && username.length > 20) errors.username = 'Username should be less then 20 characters!'
  if(username && username.length < 6) errors.username = 'Username should not be less then 6 characters!'

  if(!email) errors.email = 'Email is required'
  if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) errors.email = 'Invalid email address'

  if(!password) errors.password ='Password is reqiured'
  if(password && password.length < 6) errors.password = 'Password must not be less then 6 characters!'
  if(password && password.length > 20) errors.password = 'Password must be less then 20 characters!'

  if(!passwordConfirm) errors.passwordConfirm = 'Password Confirmation Confirmation is required!'
  if(passwordConfirm && passwordConfirm.length < 6) errors.passwordConfirm = 'Password Confirmation must be longer then 6 characters!'
  if(passwordConfirm && passwordConfirm.length > 20) errors.passwordConfirm = 'Password Confirmation must be less then 20 characters!'

  if(password !== passwordConfirm) errors.password = 'Password must be match!'

  if(Object.keys(errors).length !== 0) {
    res.status(403).json({ errors: errors })
    return
  }

  const usernameExists = await isUsernameTaken(username)
  if (usernameExists) {
    res.status(403).send({ error: 'Username already exists!' })
    return
  }

  const emailExists = await isEmailTaken(email)
  if (emailExists) {
    res.status(403).send({ error: 'Email already exists!' })
    return
  }

  const newUser = new User({
    'local.username': username.trim(),
    'local.password': password.trim(),
    'local.email': email.trim(),
    'local.verified': false,
  })
  await newUser.save()

  //create token
  const token = await new Token().createVerificationToken(newUser.id, email)

  // create a URL which being sent to user's email for for verification
  const authenticationURL = config.DOMAIN + '/verify_email?token=' + token

  //mailgun
  const data = {
    from: 'Mailgun <' + config.MAILGUN_SMTP_LOGIN + '>',
    to: email.trim(),
    subject: 'Account Verification',
    html: emailTemplate.VERIFICATION_EMAIL_TEMPLATE(authenticationURL)
  }

  mailgun.messages().send(data, (error, body) => {
    if(error) {
      res.json({ err: 'fail to send the email', error })
      return
    }
    res.json({ success: 'You will be received a verification email in a few minutes, please check ' + email })
    return
  })

})

export const isUserExist = asyncRequest(async (req, res, next) => {
  const error = {
    username: '',
    email: ''
  }

  if(!req.body) {
    res.json({ err: 'Username or Email is required' })
    return
  }

  const users = await User.find({ $or:[ { 'local.username': req.body.username }, { 'local.email' : req.body.email } ]}).exec()

  if(!users) {
    next()
    return
  }

  _.map(users, function(mapUser) {
    if(mapUser.local.username === req.body.username) {
      error.username = 'Username is taken'
    }
    if(mapUser.local.email === req.body.email) {
      error.email = 'Email is taken'
    }
  })
  if( error.username === '' &&  error.email === '' ) {
    res.json({ success : 'Username and Email is available' })
    return
  }
  return res.json(error)

})

// var passport = require('../passport/passport-config.js')
  // router.post('/login', passport.authenticate('local'), function(req, res, next) {
  // req.user 中会包含在 deserializeUser 函数中传入的 user 数据
  // var returnData = {
  //   isSuccess: true,
  //   uer: req.user
  // }
  // res.send(JSON.stringify(returnData))
  /**
   * 如下所示，我们在路由的请求地址 “/login” 和 后续的请求处理函数之间调用
   * passport.authenticate('local')，即可完成对用户输入的用户名密码的验证
   */
export const login = asyncRequest(async (req, res, next) => {
  const { account, password } = req.body

  if(!account) return res.json({ err: { username: 'Username/Email is required' } })
  if(!password) return res.json({ err: { password: 'Password is reqiured' } })

  const user = await User.findOne({ $or:[ { 'local.username' : account }, { 'local.email': account } ] }).exec()

  if(!user) {
    res.json({ err: 'Unauthenticated' })
    return
  }

  user.comparePassword(password, (err, isMatch) => {
    if (err) {
      res.json({ err: 'Username/Email or Password is invalid!' })
      return
    }
    if (!isMatch) {
      res.json({ err: 'Unauthenticated' })
      return
    }
  })

  if (!user.local.verified) {
    const token = await new Token().createVerificationToken(user._id, user.local.email)
    // send email
    sendEmail.sendVerificationEmail(mailgun, token, user.local.email, 'Account Verification', function(err, notVerify) {
      if(notVerify) {
        res.json(notVerify)
        return
      }
    })

  } else {
    const token = jwt.sign({
      id: user.get('id'),
      username: user.get('local.username'),
      email: user.get('local.email'),
      avatar_name: user.get('local.avatar_name'),
      nick_name: user.get('local.nick_name')
    }, authConfig.tokenSecret )
    return res.json({ token,  success: 'Authenticated' })
  }

})

export const verifyEmail = (req, res) => {
  if(req.query.token) {
    Token.verifyUser(req.query.token, (err, success) => {
      if(err) return res.json(err)
      return res.json(success)
    })
  } else {
    return res.json({ err : 'Invalid token!'})
  }
}

export const sendVerifyEmail = asyncRequest(async (req, res) => {
  const email = req.body.email
  if(!email) {
    res.json({ err: 'Email is required! '})
    return
  }

  const user = await User.findOne({ 'local.email': email }).exec()

  if(!user) {
    res.json({ msg: email + ' is not register!' })
    return
  }

  if(!user.verified) {
    // create token
    const token = await new Token().createVerificationToken(user._id, email)
    // send email
    sendEmail.sendVerificationEmail(mailgun, token, email, 'Account Verification', function(err, notVerify) {
      if(notVerify) {
        res.json({ msg: 'You will be received a verification email in a few minutes, please check ' + email })
        return
      }
    })
  } else {
    return res.json({ msg: email + ' is already a verified user' })
  }

})

export const resetPassword = asyncRequest(async (req, res) => {
  const token = req.query.token
  const { password, passwordConfirm } = req.body

  if(!token) {
    res.json({ err: 'Token is expired!' })
    return
  }
  if(!password) {
    res.json({ err: 'Password is required!' })
    return
  }
  if(!passwordConfirm) {
    res.json({ err: 'Password Confirmation is required!' })
    return
  }
  if(password !== passwordConfirm) {
    res.json({ err: 'Passwords must is match!' })
    return
  }

  const doc = await Token.findOne({ token: token }).exec()

  if(!doc) {
    res.json({ err: 'Token is expired!' })
    return
  }

  const user = await User.findOne({ _id: doc.userid }).exec()
  if(!user) {
    res.json({ err: 'User has been deleted!' })
    return
  }

  user.local.password = password
  await user.save()
  res.json({ success: 'Password reset successfully!'})

})

export const forgetPassword = asyncRequest(async (req, res) => {
  const email = req.body.email
  if (!email) {
    res.json({ err: 'Email is required!' })
    return
  }

  const user = await User.findOne({ 'local.email': email })

  if (!user) {
    res.json({ err: 'No Such User' })
    return
  }

  const token = await new Token().createVerificationToken(user._id, email)
  if(token) {
    sendEmail.sendResetPasswordEmail(mailgun, token, email, 'Reset Password', function(err, success) {
      if(err) return res.json(err)
      if(success) return res.json(success)
    })
  } else {
    return res.json({ err: 'fail to create the token' })
  }

})

export const logout = (req, res) => {
  // passportAuth.req.logout() 等于以面两行
  req.session.isAuthenticated = false
  req.logout()
  return res.json({ success: 'logout successfully!' })
}
