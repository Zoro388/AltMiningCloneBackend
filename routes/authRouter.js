const express = require("express");
const {
  registerUser,
  signInUser,
  // getUser,
  getUserById,
  getAllUsers,
} = require("../controllers/authController");
const methodNotAllowed = require("../utilis/methodNotAllowed");
const auth = require("../middlewares/auth");

const router = express.Router();

// Register a new user
router.route("/register").post(registerUser).all(methodNotAllowed);

// Sign in an existing user
router.route("/signin").post(signInUser).all(methodNotAllowed);

// Get the current authenticated user
// router.route("/me").get(auth, getUser).all(methodNotAllowed);

// Get all users
router.route("/").get(auth, getAllUsers).all(methodNotAllowed);

// Get a user by ID
router.route("/:id").get(auth, getUserById).all(methodNotAllowed);
module.exports = router;
