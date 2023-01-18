const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { registerValidators } = require("../utils/validators");
const authController = require("../controllers/auth.controller");
const router = Router();

router.get("/login", authController.render);

router.get("/logout", authController.signOut);

router.post("/login", authController.signIn);

router.post("/register", registerValidators, authController.create);

module.exports = router;
