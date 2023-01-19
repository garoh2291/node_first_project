const { Router } = require("express");
const auth = require("../middleware/auth");
const cartController = require("../controllers/cart.controller");
const router = Router();

//add course in cart
router.post("/add", auth, cartController.addInCart);

//delete course from cart
router.delete("/remove/:id", auth, cartController.deleteFromCart);

//render cart page with user's courses in cart
router.get("/", auth, cartController.getCart);

module.exports = router;
