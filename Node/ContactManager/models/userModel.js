const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add user name"],
    },
    contact: {
      type: Number,
      required: [true, "please add contact number"],
    },
    email: {
      type: String,
      required: [false, "please add email-address"],
    },
    password: {
      type: String,
      required: [true, "please add password"],
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
