const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },

  username: {
    required: true,
    type: String,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },

  email: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
