// module.exports.authenticated = function authenticated(req, res, next){
//   req.session.isAuthenticated = req.session.passport.user !== undefined;
//   res.locals.isAuthenticated = req.session.isAuthenticated;
//   if (req.session.isAuthenticated) {
//     res.locals.user = req.session.passport.user;
//   }
//   next();
// }

module.exports.logout = function logout(req){
  req.session.isAuthenticated = false;
  req.logout();
};
