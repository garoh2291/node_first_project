//to connect express
const express = require("express");
//to connect express
const mongoose = require("mongoose");
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

//require routes
const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const addRoutes = require("./routes/add");
const courseRoutes = require("./routes/courses");
const ordersRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");
//require user model

const MONGODB_URI = `mongodb+srv://Garo:Aa123456@cluster0.mrwlh1v.mongodb.net/shop`;

//Call express
const app = express();

//call mongo session store
const store = new MongoStore({
  collection: "sessions",
  uri: MONGODB_URI,
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

app.use(express.urlencoded({ extended: true }));

//connect session
app.use(
  session({
    secret: "some secret value",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

//add csrf
app.use(csrf());

//add flash

app.use(flash());

//connect middlewares

app.use(varMiddleware);
app.use(userMiddleware);

//Connect to routes
app.use("/", homeRoutes);

app.use("/add", addRoutes);

app.use("/courses", courseRoutes);

app.use("/card", cardRoutes);

app.use("/orders", ordersRoutes);

app.use("/auth", authRoutes);

//application port
const PORT = process.env.PORT || "3050";

//connect mongo db
async function start() {
  try {
    //mongodb url

    mongoose.set("strictQuery", true); //additional config for warning

    //Connect mongo db
    await mongoose.connect(MONGODB_URI, {
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
