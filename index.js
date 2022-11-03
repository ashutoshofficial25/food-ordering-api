const express = require("express"); // this package returns a function
require("dotenv").config();
const { connect } = require("./src/config/database");
const app = express(); //executig function returned by expressjs
const apiRouter = require("./src/routes/index");
const { User } = require("./src/models/userModel");
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "hii there",
  });
});

app.listen(5000, async () => {
  console.log("server started successfully");
  await connect();
  console.log("Database connected successfully!");

  // const user = User.create({
  //   email: "user1@email.com",
  //   password: "ashu1234",
  //   username: "ashutosh",
  // });
});
