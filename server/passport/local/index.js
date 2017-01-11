var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function (app) {
  /**
   *  Local Strategy
   **/
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, localLoginStrategyFn));

  function localLoginStrategyFn(req, username, password, done) {

    process.nextTick(function() {

      User.findOne({ 'local.username': username }, function (err, user) {
        if(err) {
          return done(err);
        }
        if(!user) {
          return done(null, false, { message: 'No such user!' });
        }
        if(user) {
          User.comparePassword(password, function(err, isMatch) {
            if(err) return done(err);
            if(!isMatch) return done(null, false, { message: 'Password is invalid!' });
            if(isMatch) {
              return done(null, user);
            }
          })
        }
      });

    });

  }

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, localSignupStrategyFn ));

  function localSignupStrategyFn(req, email, password, done) {

    process.nextTick(function() {

      User.findOne({ 'local.email': email }, function(err, user) {
        if(err) return done(err);
        if(user) return done(null, false, { message: 'This email is already taken!' });
        // if(user) return done(null, false, req.flash('signupMessage', 'This email is already taken!' )); //use flash message
        if(!req.user) {
          var newUser = new User();
          newUser.local.username = email;
          newUser.local.password = password;

          newUser.save(function(err) {
            if(err) return done(err);
            return done(null, newUser);
          });

        } else {
          var user = req.user;
          user.local.username = email;
          user.local.password = password;

          user.save(function(err) {
            if(err) return done(err);
            return done(null, user);
          });

        }

      });

    });

  }

  app.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect: '/chat',
    failureRedirect: '/',
    failureFlash: false
  }));

  app.post('/connect/local', passport.authenticate('local-signup', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
      failureFlash : false // allow flash messages
  }));

  app.get('/unlink/local', function(req, res){
		var user = req.user;

		user.local.username = null;
		user.local.password = null;

		user.save(function(err){
			if(err)
				throw err;
			res.redirect('/profile');
		});

	});

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  })


}
