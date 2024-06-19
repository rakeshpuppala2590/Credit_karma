const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const userModel = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  dob:{
    type: String
  },
});

module.exports = mongoose.model("users", userModel);