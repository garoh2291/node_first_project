const { Router } = require("express");
const auth = require("../middleware/auth");
const orderController = require("../controllers/order.controller");
const router = Router();

//render order page with user's orders
router.get("/", auth, orderController.getBatch);

//add new order
router.post("/", auth, orderController.create);

module.exports = router;
