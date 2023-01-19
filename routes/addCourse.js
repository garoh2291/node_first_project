const { Router } = require("express");
const auth = require("../middleware/auth");
const { courseValidators } = require("../utils/validators");
const courseConroller = require("../controllers/courses.controller");

const router = Router();

//render Add new course page
router.get("/", auth, courseConroller.createSingleRender);

//create new course
router.post("/", auth, courseValidators, courseConroller.createSingle);

module.exports = router;
