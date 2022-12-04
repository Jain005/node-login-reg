const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
    first_name: String,
    last_name: String,
  })
);

module.exports = User;
