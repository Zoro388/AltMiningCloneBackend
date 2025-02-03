const express = require("express");
const {
  registerUser,
  signInUser,
  getUserById,
  createProduct,

} = require("../controllers/authController"); // Import controller functions
const methodNotAllowed = require("../utilis/methodNotAllowed"); // Handle unsupported HTTP methods
const auth = require("../middlewares/auth"); // Authentication middleware

const router = express.Router();

// Route to register a new user
router
  .route("/register")
  .post(registerUser) // POST request for user registration
  .all(methodNotAllowed); // Reject other HTTP methods

// Route to sign in an existing user
router
  .route("/signin")
  .post(signInUser) // POST request for user sign-in
  .all(methodNotAllowed); // Reject other HTTP methods 

  // Route to create a product
router
.route("/create")
.post(auth, createProduct) // Allows POST method for creating appointment
.all(methodNotAllowed); // Reject other HTTP methods

module.exports = router; // Export router to be used in app.js or server.js
