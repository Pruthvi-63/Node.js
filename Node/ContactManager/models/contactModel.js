const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "please add contact name"],
    },
    contact: {
      type: Number,
      required: [true, "please add contact number"],
    },
    email: {
      type: String,
      required: [true, "please add email-address"],
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
