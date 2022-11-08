const express = require("express"); // this package returns a function
require("dotenv").config();
const { connect } = require("./src/config/database");
const app = express(); //executig function returned by expressjs
const bodyParser = require("body-parser");
const passport = require("passport");
const apiRouter = require("./src/routes/index");
const { User } = require("./src/models/userModel");
const authRouter = require("./src/routes/authRoutes");
const morgan = require("morgan");
require("./src/utils/auth");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use("/", authRouter);
app.use("/api", apiRouter);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    success: false,
    error: err,
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    Success: "True",
    message: "This is a food ordering API, You api end points are follwing",
    data: {
      signup: "https://localhost:5000/signup",
      login: "https://localhost:5000/login",
      get_menu: "https://localhost:5000/api/v1/get-all-foods",
      check_your_cart: "https://localhost:5000/apo/v1/userId/cart",
      order: "https://localhost:5000/api/v1/order-now",
    },
  });
});

app.listen(5000, async () => {
  console.log("server started successfully");
  await connect();
  console.log("Database connected successfully!");
});
