const { Schema, model } = require("mongoose");

//courses schema describes courses fields and methods
const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

courseSchema.method("toClient", function () {
  const course = this.ObjectId();

  course.id = course._id;
  delete course._id;

  return course;
});

module.exports = model("Course", courseSchema);
