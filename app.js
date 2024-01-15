var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDatabase = require("./db/connection");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var adminRouter = require("./routes/admin");
var cartRouter = require("./routes/cart")
var paymentRouter = require("./routes/payment")

var app = express();
const exphbs = require("express-handlebars");

// view engine setup
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "layout", // Set the default layout file name
    layoutsDir: path.join(__dirname, "views", "layout"), // Specify the layouts directory
  })
);
app.set("view engine", ".hbs"); // Set the view engine

mongoose.set("strictQuery", false); // Your Mongoose configuration

app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json());

app.use("*", require("./Services/authServices").tokenVerification);
// app.use("/refresh-token", require("./Services/authServices").tokenRefresh);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/cart",cartRouter)
app.use("/payment",paymentRouter)

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

connectDatabase();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
