const express = require("express"); // this package returns a function
require("dotenv").config();
const { connect } = require("./src/config/database");
const app = express(); //executig function returned by expressjs
const bodyParser = require("body-parser");
const passport = require("passport");
const apiRouter = require("./src/routes/index");
const { User } = require("./src/models/userModel");
const authRouter = require("./src/routes/authRoutes");
require("./src/utils/auth");
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", authRouter);
app.use("/api", apiRouter);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    success: false,
    error: err,
  });
});

app.listen(5000, async () => {
  console.log("server started successfully");
  await connect();
  console.log("Database connected successfully!");

  // const user = await User.create({
  //   email: "user1@email.com",
  //   password: "ashu1234",
  //   username: "ashutosh",
  // });
});
