const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//pre-save is a trigger that gets a function and execute it before user object :
userSchema.pre("save", async (next) => {
  const user = this;
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});

userSchema.method.isValidPassword = async (password) => {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
