import User from '../models/user'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import fse from 'fs-extra'
import { config } from '../../config'
import validator from 'validator'
import base64Img from 'base64-img'
import crypto from 'crypto'
import { asyncRequest } from '../utils'

const gm = require('gm').subClass({ imageMagick: true }) // resize image

// change info by (one) field
export const changeInfo = asyncRequest(async (req, res) => {
  if(!req.body) {
    res.json({ err: { username: 'This field is required!' } })
    return
  }

  let key, value = null

  key = _.map(req.body, function( v, k ) {
    return k
  })

  value = _.map(req.body, function( v, k ) {
    return v
  })

  key = key[0]

  if(key === 'username') {
    if(value[0].length < 6) return res.json({ err: { username: 'Must be longer than 6 character' }})
  } else if (key === 'email') {
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value[0])) return res.json({ err: { email: 'Must be a valid email address!' }})
  } else if (key === 'nick_name') {
    console.log(key, value)
  }

  const user = await User.findOne({ _id: value[1] }).exec()
  if(!user) {
    res.json({ err: 'No such User' })
    return
  }

  user.local[key] = value[0]
  value = value[0]
  await user.save()

  const token = jwt.sign({
    id: user.get('id'),
    username: user.get('local.username'),
    email: user.get('local.email'),
    avatar_name: user.get('local.avatar_name'),
    nick_name: user.get('local.nick_name')
  }, config.tokenSecret )
  res.json({ success: '' + key + ' change successfully!', [key]: value, token: token })

}) // changeInfo

export const uploadAvatar = asyncRequest(async (req, res, next) => {
  if(!req.file) {
    res.status(400).json({ err: 'Sorry, file couldn\'t be uploaded.' })
    return
  }

  // read the image from req.file
  const data = fs.readfilesync(req.file.path)

  if(!data) {
    res.status(400).json({ error: 'Sorry, fail to this time uploaded. please, try it again!' })
    return
  }

  // get the originalname(path) from the req.file
  const fileName = req.file.originalname

  if(!fileName) {
    res.status(400).json({ err: 'Sorry, fail to this time uploaded. please, try it again!' })
    return
  }

  const fullsizePath = "build/uploads/" + req.currentUser._id + "/images/avatar/fullsize/"
  const thumbPath = "build/uploads/" + req.currentUser._id + "/images/avatar/thumbs/"

  // create user folder if not exists
  if(!fs.existsSync(fullsizePath)) {
    fse.mkdirs(fullsizePath, function(err) {
      if(err) console.log('err', err)
    })
  } else {
    fse.emptyDir(fullsizePath, function (err) {
      if (!err) console.log('success!')
    })
  }
  if(!fs.existsSync(thumbPath)) {
    fse.mkdirs(thumbPath, function(err) {
      if(err) console.log('err', err)
    })
  } else {
    fse.emptyDir(thumbPath, function (err) {
      if (!err) console.log('success!')
    })
  }

  // write file to uploads/fullsize folder
  await fs.writeFileSync(fullsizePath + req.file.filename, data, function(err) {
    if(err) {
      res.json({ err: 'Sorry, fail to this time uploaded. please, try it again!' })
      return
    }
  }) // fs.writeFile


  // delete the temp file
  await fs.unlink(req.file.path, (err) => {
    if (err) {
      console.log('fail to delete the image: ', err)
      res.json({ err: 'Sorry, fail to this time uploaded. please, try it again!' })
      return
    }
  })

  // resize the avatar and write to thumbs folder
  await gm(fullsizePath + req.file.filename)
    .resizeExact(240, 240)
    .write(thumbPath + req.file.filename, function (err) {
      if (err) {
        console.log('resize error: ', err)
        res.json({ err: 'Sorry, fail to this time uploaded. please, try it again!' })
        return
      }
    })

  // save the avatar name
  const user = await User.findOne({ _id: req.currentUser._id }).exec()

  if(!user) {
    res.status(400).json({ err: 'Sorry, fail to this time uploaded. please, try it again!' })
    return
  }

  // save the avart name to database
  user.local.avatar_name = req.file.filename
  await user.save()

  // sign the new token and send it back to the user
  const token = jwt.sign({
    id: user.get('id'),
    username: user.get('local.username'),
    email: user.get('local.email'),
    avatar_name: user.get('local.avatar_name'),
    nick_name: user.get('local.nick_name')
  }, config.tokenSecret )
  res.json({ success: 'Avatar has change successfully!', token: token })

}) // uploadAvatar

export const updateInfo = asyncRequest(async (req, res) => {
  const { username, nick_name } = req.body
  if(!username) return res.json({ err: { username: 'Username must be provided!' } })
  if(username && username.length < 6 && username.length > 12) return res.json({ err: { username: 'Username must be longer than 6 character and less than 12 character!' } })
  if(!validator.isAlphanumeric(username, ['en-US'])) return res.json({ err: { username: 'Letters and numbers only!' } })
  if(username && username.indexOf(' ') >= 0 ) return res.json({ err: { username: 'can\'t contain whitespace!' } })
  if(nick_name && nick_name.length > 12) return res.json({ err: { nick_name: 'Nick Name can\'t longer then 12 character' } })

  const user = await User.findById(req.currentUser)

  if(!user) {
    res.json({ err: 'No such user!' })
    return
  }

  user.local.username = username
  user.local.nick_name = nick_name
  await user.save()

  const token = jwt.sign({
    id: user.get('id'),
    username: user.get('local.username'),
    email: user.get('local.email'),
    avatar_name: user.get('local.avatar_name'),
    nick_name: user.get('local.nick_name')
  }, config.tokenSecret )

  res.json({ success: 'Infomation has change successfully!', token: token })


}) // updateInfo

export const uploadDataUrl = asyncRequest(async (req, res) => {
  if(!req.body.img) {
    res.json({ err: 'avatar must be provided' })
    return
  }

  //create the path
  const thumbPath = "build/uploads/" + req.currentUser._id + "/images/avatar/thumbs/"

  // Ensures that the directory exists. If the directory structure does not exist, it is created.
  await fse.ensureDir(thumbPath, function (err) {
    if(err) {
      res.json({ err: err })
      return
    }
  }) // fs.ensureDir

  // create avatar radom name
  // var seed = crypto.randomBytes(10)
  const radomName = await crypto.createHash('sha1').update(new Date().getTime().toString(), req.currentUser._id).digest('hex')

  // empty the directory
  await fse.emptyDir(thumbPath, function (err) {
    if (err) {
      res.json({ err: err })
      return
    }
  })

  // convert base64 dataUrl to image, and write it to the folder
  const filepath = await base64Img.imgSync(req.body.img, thumbPath, radomName)

  if(!filepath) {
    res.status(400).json({ error: 'fail to upload, please try again!'})
    return
  }

  // create avatar_name
  const avatar_name = filepath.replace('build', '')
  // save the avatar name
  const user = await User.findOne({ _id: req.currentUser._id }).exec()

  // if not the current user
  if(!user) {
    res.status(400).res.json({ error: 'fail to save the avatar name' })
    return
  }

  // save the new avatar name to the database
  user.local.avatar_name = avatar_name
  await user.save()

  // generate the new token with new avatar name
  const token = jwt.sign({
    id: user.get('id'),
    username: user.get('local.username'),
    email: user.get('local.email'),
    avatar_name: user.get('local.avatar_name'),
    nick_name: user.get('local.nick_name')
  }, config.tokenSecret )

  // send back to the new token
  res.json({ success: 'Avatar upload successfully!', token: token })

})
