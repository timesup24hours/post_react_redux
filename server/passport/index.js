import passport from 'passport'
import User from '../models/user'
import { config } from '../../config'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import facebook from './facebook'
import google from './google'

export default (app) => {
  // serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中（在这里
  // 存到 session 中的是用户的 username）。在这里的 user 应为我们之前在
  // new LocalStrategy (fution() { ... }) 中传递到回调函数 done 的参数 user 对象（从数据// 库中获取到的）
  passport.serializeUser(function(user, done){
    done(null, user._id)
  })

  // deserializeUser 在每次请求的时候将会根据用户名读取 从 session 中读取用户的全部数据
  // 的对象，并将其封装到 req.user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      if(err) {
        return done(err)
      }
      done(null, user)
    })
  })

  require('./local')(app)
  facebook(app)
  google(app)
}
