import express from 'express'
const router = express.Router();
import * as controller from '../controllers/auth.js'
import passport from 'passport'

router.post('/signup', controller.signup);

router.post('/isUserExist', controller.isUserExist);

router.post('/login', controller.login);

router.get('/verify_email', controller.verifyEmail);

router.post('/send_verify_email', controller.sendVerifyEmail);

router.post('/reset_password', controller.resetPassword);

router.post('/forget_password', controller.forgetPassword);

router.get('/logout', controller.logout);

router.get('/getUserInfo', function(req, res) {
  return res.json(req.user);
})

// 这是封装了一个中间件函数到 passport 中，可以在需要拦截未验证的用户的请求的时候调用
passport.authenticateMiddleware = function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }

router.get('/p', passport.authenticateMiddleware, function(req, res) {
  res.json({ msg: 'you got me!' });
})

export default router;
