const express = require("express");
const {
  registerUser,
  signInUser,
  getUser,
} = require("../controllers/authController");
const methodNotAllowed = require("../utilis/methodNotAllowed");
const auth = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(auth, getUser).all(methodNotAllowed);
router.route("/register").post(registerUser).all(methodNotAllowed);
router.route("/signin").post(signInUser).all(methodNotAllowed);

module.exports = router;
