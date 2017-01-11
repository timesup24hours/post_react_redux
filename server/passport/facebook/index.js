import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { config, auth as authConfig, facebook as facebookConfig } from '../../../config'
import User from '../../models/user'
import jwt from 'jsonwebtoken'
import { asyncRequest } from '../../utils'
import crypto from 'crypto'

export default (app) => {

  // Facebook Strategy
  passport.use(new FacebookStrategy({
      clientID: facebookConfig.appID,
      clientSecret: facebookConfig.appSecret,
      callbackURL: facebookConfig.routes.facebookAuthCallback,
      passReqToCallback: true,
      profileFields: [ 'id', 'displayName', 'photos', 'email' ]
    }, facebookStrategyFn ))

  function facebookStrategyFn(req, accessToken, refreshToken, profile, done){
    process.nextTick(asyncRequest( async function() {
      //user is not logged in yet

      // let displayName
      // if(profile) {
      //   displayName = profile.displayName.split(' ').join('').toLowerCase()
      // }

      const user = await User.findOne({ 'facebook.id': profile.id })
      // if the user is not login
      if(!req.user) {
        // if user already in the database, then resave the token
        if(user) {
          if(!user.facebook.token) {
            user.facebook.token = accessToken
            await user.save()
          }

          done(null, user)
          return

        } else {
          // if user not in the database, then create the new one

          // before create the new one, check if the email in the facebook is exist in our database or not
          const isEmailExist = await User.findOne({ 'local.email': profile.emails[0].value })
          if(isEmailExist) {
            done({ error: 'Email in your facebook account is already taken!' }, false)
            return
          }

          const seed = await crypto.randomBytes(6)
          const userid = await crypto.createHash('sha256').update(seed).digest('hex').slice(0, 6)
          const sliceId = profile.id.slice(profile.id.length - 3, profile.id.length)
          const newUser = new User()
          newUser.facebook.id = profile.id
          newUser.facebook.token = accessToken
          newUser.local.username = userid + sliceId
          newUser.local.nick_name = profile.displayName
          newUser.local.email = profile.emails[0].value
          newUser.local.avatar_name = `https://graph.facebook.com/${profile.id}/picture?type=normal`
          newUser.local.verified = true

          await newUser.save()
          done(null, newUser)
          return
        }


      } else {
        // if user logged in already
        let user = req.user
        user.facebook.id = profile.id
        user.facebook.token = accessToken
        user.local.username = user.local.username
        user.local.email = user.local.email
        user.local.avatar_name = user.local.avatar_name
        user.local.nick_name = user.local.nick_name

        await user.save()
        done(null, user)
        return
      }

    }))
  }

  app.get('/api/authentication/failure/:error', (req, res) => {
    res.redirect('/auth/failure/' + req.params.error)
  })

  app.get('/api/authentication/success/:token', (req, res) => {
    res.redirect('/auth/success/' + req.params.token)
  })

  // logout facebook
  app.get('/unlink/facebook', function(req, res){
    // req.logout()
		let user = req.user

		user.facebook.token = null

		user.save(function(err){
			if(err) throw err
			res.redirect(config.DOMAIN + '/login')
		})
	})

  // login facebook /auth/facebook
  app.get(facebookConfig.routes.facebookAuth,
    passport.authenticate('facebook', { scope: 'email' })
  )

  // // callback url /auth/facebook/callback
  // app.get(facebookConfig.routes.facebookAuthCallback,
  //   passport.authenticate('facebook', {
  //     // successRedirect: config.FRONT_END_HOST_NAME + facebookConfig.routes.chat,
  //     failureRedirect: config.HOST + '/authentication/failure',
  //     // failureRedirect: config.FRONT_END_HOST_NAME + facebookConfig.routes.login,
  //     failureFlash: false }
  //   ),
  //   function(req, res) {
  //     const token = jwt.sign({
  //       id: req.user.id,
  //       username: req.user.local.username,
  //       email: req.user.local.email,
  //       avatar_name: req.user.local.avatar_name,
  //       nick_name: req.user.local.nick_name,
  //       type: 'facebook'
  //     }, authConfig.tokenSecret )
  //     res.redirect(config.FRONT_END_HOST_NAME + '/auth/success/' + token);
  //   }
  // )

  // callback url /auth/facebook/callback
  app.get(facebookConfig.routes.facebookAuthCallback,
    function(req, res, next) {

      passport.authenticate('facebook', function(err, user, info) {
        if (user) {
          const token = jwt.sign({
            id: user._id,
            username: user.local.username,
            email: user.local.email,
            avatar_name: user.local.avatar_name,
            nick_name: user.local.nick_name,
            type: 'facebook'
          }, authConfig.tokenSecret )
          res.redirect('/api/authentication/success/' + token)
        } else {
          res.redirect('/api/authentication/failure/' + err.error)
          return
        }
      })(req, res, next)

    }
  )



}
