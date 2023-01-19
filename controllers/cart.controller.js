const Course = require("../models/course");
const { computePrice, mapCartItems } = require("../utils/helpers");

class CartController {
  getCart = async (req, res) => {
    const user = await req.user.populate("cart.items.courseId");
    const courses = mapCartItems(user.cart);

    res.render("card", {
      title: "Cart",
      courses: courses,
      price: computePrice(courses),
      isCard: true,
    });
  };

  addInCart = async (req, res) => {
    const course = await Course.findById(req.body.id);

    await req.user.addToCart(course);

    res.redirect("/card");
  };

  deleteFromCart = async (req, res) => {
    await req.user.removeFromCart(req.params.id);
    const user = await req.user.populate("cart.items.courseId");

    const courses = mapCartItems(user.cart);
    const cart = {
      courses,
      price: computePrice(courses),
    };

    res.status(200).json(cart);
  };
}

module.exports = new CartController();
