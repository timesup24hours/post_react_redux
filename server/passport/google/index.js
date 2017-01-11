import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth'
import config, { google as googleConfig } from '../../../config'
import User from '../../models/user'

export default (app) => {

  // Google Strategy
  passport.use(new GoogleStrategy({
      clientID: googleConfig.CLIENT_ID,
      clientSecret: googleConfig.CLIENT_SECRET,
      callbackURL: googleConfig.routes.googleAuthCallback,
      passReqToCallback: true
    }, googleStrategyFn ));


  function googleStrategyFn (req, accessToken, refreshToken, profile, done){
    process.nextTick(function() {

      if(!req.user) {
        User.findOne({ 'google.id': profile.id }, function(err, user) {
          if(err) return done(err);
          if(user) {
            if(!user.google.token) {
              user.google.token = accessToken;
              user.local.username = profile.displayName;
              user.local.email = profile.emails[0].value;

              user.save(function(err) {
                if(err) return done(err);
                return done(null, user);
              });

            }
            return done(null, user);
          } else {
            var newUser = new User();
            newUser.google.id = profile.id;
            newUser.google.token = accessToken;
            newUser.local.username = profile.displayName;
            newUser.local.email = profile.emails[0].value;

            newUser.save(function(err) {
              if(err) return done(err);
              return done(null, newUser);
            })
          }
        });
      } else {
        var user = req.user;
        user.google.id = profile.id;
        user.google.token = accessToken;
        user.local.username = profile.displayName;
        user.local.email = profile.emails[0].value;

        user.save(function(err) {
          if(err) return done(err);
          return done(null, user);
        });

      }

    });

  }

  app.get('/connect/google', passport.authorize('google', { scope: [ 'profile', 'email' ] }));


	app.get('/connect/google/callback',
		passport.authorize('google', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

  app.get('/unlink/google', function(req, res){
    let user = req.user;
    user.google.token = null;

    user.save(function(err){
      if(err)
        throw err;
      res.redirect(config.FRONT_END_HOST_NAME + '/login');
    });
  });

  app.get(googleConfig.routes.googleAuth,
    passport.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read']
    })
  );

  app.get(googleConfig.routes.googleAuthCallback,
    passport.authenticate('google', {
      successRedirect: config.FRONT_END_HOST_NAME + googleConfig.routes.chat,
      failureRedirect: config.FRONT_END_HOST_NAME + googleConfig.routes.login,
      failureFlash: true }
    )
  );

}
