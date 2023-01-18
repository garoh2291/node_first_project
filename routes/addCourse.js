const { Router } = require("express");
const auth = require("../middleware/auth");
const { courseValidators } = require("../utils/validators");
const courseConroller = require("../controllers/courses.controller");

const router = Router();

router.get("/", auth, (req, res) => {
  res.render("add", {
    title: "Add new product",
    isAdd: true,
  });
});

router.post("/", auth, courseValidators, courseConroller.createSingle);

module.exports = router;
