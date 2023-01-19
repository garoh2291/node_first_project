module.exports = function (req, res, next) {
  //check if there is an active session and if Yes add new key is response locals
  res.locals.isAuth = req.session.isAuthenticated;
  res.locals.csrf = req.csrfToken();
  next();
};
