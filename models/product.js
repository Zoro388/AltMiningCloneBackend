const mongoose = require("mongoose");

const User = mongoose.models.User || mongoose.model("User", userSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Please provide a category"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  image: {
    type: String,
    required: [true, "Please provide an image URL"],
  },
  name: {
    type: String,
    required: [true, "Please provide a product name"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
  },
  quantity: {
    type: Number,
    required: [true, "Please provide a quantity"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Relationship with User model
    required: false,
  },
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = { User, Product };  // Export both models if necessary
