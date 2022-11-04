const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { User } = require("../models/userModel");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.create({
          email,
          password,
        });
        done(null, user);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: "User not found" });
        const validate = await user.isValidPassword(password);
        if (!validate)
          return done(null, false, { message: "Email or Password incorrect!" });

        return done(null, user, { message: "Login Successfull!" });
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

// passport.use(
//   new JWTStrategy(
//     {
//       SecertorKey: "MY_Secret_Code",
//       jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
//     },
//     async (token, done) => {
//       try {
//         return done(null, token.user);
//       } catch (error) {
//         console.log(error);
//         done(error);
//       }
//     }
//   )
// );
