const { Router } = require("express");
const auth = require("../middleware/auth");
const cartController = require("../controllers/cart.controller");

const router = Router();

router.post("/add", auth, cartController.addInCart);

router.delete("/remove/:id", auth, cartController.deleteFromCart);

router.get("/", auth, cartController.getCart);

module.exports = router;
