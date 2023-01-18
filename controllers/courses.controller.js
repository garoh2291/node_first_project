const Course = require("../models/course");
const { validationResult } = require("express-validator");

class CousesController {
  getBatch = async (req, res) => {
    const courses = await Course.find()
      .populate("userId", "email name")
      .select("price title img");

    res.render("courses", {
      title: "Courses",
      isCourses: true,
      courses,
    });
  };

  getSingleChange = async (req, res) => {
    if (!req.query.allow) {
      return res.redirect("/");
    }

    try {
      const course = await Course.findById(req.params.id);

      res.render("course-edit", {
        title: `Change course ${course.title}`,
        course,
      });
    } catch (e) {
      console.log(e);
    }
  };

  editSingle = async (req, res) => {
    const errors = validationResult(req);

    const { id } = req.body;

    if (!errors.isEmpty()) {
      return res.status(422).redirect(`/courses/${id}/edit?allow=true`);
    }

    try {
      delete req.body.id;
      const course = await Course.findById(id);

      Object.assign(course, req.body);
      await course.save();
      res.redirect("/courses");
    } catch (e) {
      console.log(e);
    }
  };

  deleteSingle = async (req, res) => {
    try {
      await Course.deleteOne({ _id: req.body.id });
      res.redirect("/courses");
    } catch (e) {
      console.log(e);
    }
  };

  getSingle = async (req, res) => {
    console.log(req.params.id);
    const course = await Course.findById(req.params.id);
    res.render("course", {
      layout: "empty",
      title: `Course ${course.title}`,
      course,
    });
  };

  createSingle = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("add", {
        title: "Add new product",
        isAdd: true,
        error: errors.array()[0].msg,
        data: {
          title: req.body.title,
          price: req.body.price,
          img: req.body.img,
        },
      });
    }

    const course = new Course({
      title: req.body.title,
      price: req.body.price,
      img: req.body.img,
      userId: req.user,
    });

    try {
      await course.save();
      res.redirect("/courses");
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = new CousesController();
