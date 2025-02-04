const mongoose = require('mongoose');

// // Define the Product schema inside the order
const productSchemaO = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please provide a Product Name"],
  },
  productCategory: {
    type: String,
    required: [true, "Please provide a Product Category"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a Price"],
  },
  quantity: {
    type: Number,
    required: [true, "Please provide a Quantity"],
  },
  img: {
    type: String, // URL or file path
    required: false,
  },
});

// Define the Order schema
const orderSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: [true, "Please provide an Email"],
      match: [/\S+@\S+\.\S+/, "Please provide a valid email"], // Email validation
    },
    userPhoneNumber: {
      type: String,
      required: [true, "Please provide a Phone Number"],
    },
    ownerAddress: {
      type: String,
      required: [true, "Please provide an address"],
    },
    message: {
      type: String,
      required: false,
    },
    products: {
      type: [productSchemaO], // An array of products
      required: [true, "At least one product is required"],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Create a model based on the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
