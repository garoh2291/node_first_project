const { Router } = require("express");
const auth = require("../middleware/auth");
const orderController = require("../controllers/order.controller");
const router = Router();

router.get("/", auth, orderController.getBatch);

router.post("/", auth, orderController.create);

module.exports = router;
