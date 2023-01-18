module.exports = function (req, res, next) {
  //middleware will check if there is an active session , if no redirect to login page
  if (!req.session.isAuthenticated) {
    return res.redirect("/auth/login");
  }

  next();
};
