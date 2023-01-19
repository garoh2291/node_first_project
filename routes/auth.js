const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { registerValidators } = require("../utils/validators");
const authController = require("../controllers/auth.controller");
const router = Router();

//login page render
router.get("/login", authController.render);

//destroy the session
router.get("/logout", authController.signOut);

//sign in with existing user
router.post("/login", authController.signIn);

//new user registration
router.post("/register", registerValidators, authController.create);

module.exports = router;
