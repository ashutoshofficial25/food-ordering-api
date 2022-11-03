const express = require("express"); // this package returns a function
const app = express(); //executig function returned by expressjs
const apiRouter = require("./src/routes/index");
app.use("/api", apiRouter);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "hii there",
  });
});

app.listen(5000, () => {
  console.log("server started successfully");
});
