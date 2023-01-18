module.exports = function (app) {
  app.use("/", require("./home"));
  app.use("/add", require("./addCourse"));
  app.use("/courses", require("./courses"));
  app.use("/card", require("./cart"));
  app.use("/orders", require("./orders"));
  app.use("/auth", require("./auth"));
  app.use("/profile", require("./profile"));
};
