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
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = { Product };  // Export both models if necessary
