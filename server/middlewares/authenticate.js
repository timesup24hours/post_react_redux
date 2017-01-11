import User from '../models/user'
import jwt from 'jsonwebtoken'
import { auth as authConfig } from '../../config'

/**
 *  verify token
 */
export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

  if(authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if(token) {
    jwt.verify(token, authConfig.tokenSecret, function(err, decoded) {
      if(err) {
        res.status(401).json({ error : 'Fail to Authenticate'});
      } else {
        User.findOne({ _id: decoded.id }, '_id, username, email', function(err, user) {
          if(err) return res.json(err);
          if(!user) return res.json({ err: 'No Such User' });
          if(user) {
            req.currentUser = user;
            next();
          }
        })
      }
    })
  } else {
    return res.status(403).json({ error : 'No Token Provided' });
  }
}

// Passport session auth
// Have the same middleware like this one in passport.config
export const authenticationMiddleware = () => {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }
}
