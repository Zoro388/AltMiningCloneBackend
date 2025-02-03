const mongoose = require("mongoose");
 

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a Username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an Email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password"],
  },
});


// Export User Models
const User = mongoose.model("User", userSchema);

module.exports = { User };  // Exporting both models

