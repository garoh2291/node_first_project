const multer = require("multer");

const storage = multer.diskStorage({
  //user avatar name and destination config
  destination(req, file, cb) {
    cb(null, "images");
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString() + `-` + file.originalname);
  },
});

//config avatar img allowed types
const allowedTypes = ["image/png", "imgage/jpg", "image/jpeg"];

//check if uploaded files meets reqirements
const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
});
