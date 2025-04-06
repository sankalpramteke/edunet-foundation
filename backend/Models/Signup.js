const mongoose = require("mongoose");

const SignupSchema = mongoose.Schema({
  // username: {
  //   type: String,
  //   required: true,
  // },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensuring unique emails
  },
  password: {
    type: String,
    required: true,
  },
  // dob: {
  //   type: Date,
  //   required: true,
  // },
  // rollNo: {
  //   type: String,
  //   required: true,
  //   unique: true,  // Ensuring unique roll numbers
  // },
  // college: {
  //   type: String,
  //   required: true,
  // },
});

const SignupModel = mongoose.model("Signup", SignupSchema);
module.exports = SignupModel;
