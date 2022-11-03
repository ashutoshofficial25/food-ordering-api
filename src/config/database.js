const mongoose = require("mongoose");
const constants = require("./constants");

const connect = () => {
  console.log("Connectoin requested...");
  return mongoose.connect(`${constants.databaseLocal}`);
};

module.exports = { connect };
