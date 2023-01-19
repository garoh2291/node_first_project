const { Router } = require("express");
const { courseValidators } = require("../utils/validators");
const auth = require("../middleware/auth");
const coursesController = require("../controllers/courses.controller");
const router = Router();

//get all courses and render
router.get("/", coursesController.getBatch);

//get one course and render edit page of it
router.get("/:id/edit", auth, coursesController.getSingleChange);

//edit single course
router.post("/edit", auth, courseValidators, coursesController.editSingle);

//delete single course
router.post("/remove", auth, coursesController.deleteSingle);

//get single course and render page
router.get("/:id", coursesController.getSingle);

module.exports = router;
