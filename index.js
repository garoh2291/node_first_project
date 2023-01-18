//to connect express
const express = require("express");
//to connect express
const mongoose = require("mongoose");
//helmet for header
const helmet = require("helmet");
//connect csrf
const csrf = require("csurf");
//connect flash (for error messages)
const flash = require("connect-flash");
//
const session = require("express-session");
//mongo session need to connect after session
const MongoStore = require("connect-mongodb-session")(session);
//connect handlebars
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
// for handlebards error
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
//connect path
const path = require("path");

//middlewares
const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");
const errorHandler = require("./middleware/error");
const fileMiddleware = require("./middleware/file");

//require routes
const routes = require("./routes/index");

//keys
const keys = require("./config/index");

//Call express
const app = express();

//Create mongo session store
const store = new MongoStore({
  collection: "sessions",
  uri: keys.MONGODB_URI,
});
//Config handelbars
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

//for public folder , where will be styles and additional scripts
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

//for req.body
app.use(express.urlencoded({ extended: true }));

//connect session
app.use(
  session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

//file validation
app.use(fileMiddleware.single("avatar"));

//add csrf
app.use(csrf());

//add flash
app.use(flash());

//connect helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

//connect custom middlewares

app.use(varMiddleware);
app.use(userMiddleware);

//Connect to routes
routes(app);
app.use(errorHandler);

//application port
const PORT = process.env.PORT || "3050";

//connect mongo db
async function start() {
  try {
    mongoose.set("strictQuery", true); //additional config for warning

    //Connect mongo db
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
