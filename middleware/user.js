const User = require("../models/user");

module.exports = async function (req, res, next) {
  //check is there is an active session
  if (!req.session.user) {
    return next();
  }

  req.user = await User.findById(req.session.user._id);
  next();
};
