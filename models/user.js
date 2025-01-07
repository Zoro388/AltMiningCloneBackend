const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a Username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide a Email"],
  },
  password: {
    type: String,
    required: [true, "please provide a Password"],
  },
});

module.exports = mongoose.model("User", userSchema);
