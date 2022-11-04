const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res) => {
    res.status(201).json({
      success: true,
      message: "Signup Successfull",
      data: {
        user: req.user,
      },
    });
  }
);

router.post("/login", async (req, res) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("Something went wrong!");
        return next(error);
      }
      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ body }, "MY_Secret_Code");
        res
          .status(200)
          .json({ token, Success: true, message: "Logged in Success" });
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  })(req, res, next);
});

module.exports = router;
