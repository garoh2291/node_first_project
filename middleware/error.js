module.exports = function (req, res, next) {
  //middleware will check page source , if there is no page with writen route , it will redirect to error page
  res.status(404).render("404", {
    title: "Page is not found",
  });
};
