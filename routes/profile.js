const { Router } = require("express");
const profileController = require("../controllers/profileController");
const auth = require("../middleware/auth");
const router = Router();

//render user profile page with user info
router.get("/", auth, profileController.getinfo);

//change user info (name,avatar)
router.post("/", auth, profileController.changeInfo);

module.exports = router;
