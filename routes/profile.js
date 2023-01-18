const { Router } = require("express");
const profileController = require("../controllers/profileController");
const auth = require("../middleware/auth");
const User = require("../models/user");

const router = Router();

router.get("/", auth, profileController.getinfo);

router.post("/", auth, profileController.changeInfo);

module.exports = router;
