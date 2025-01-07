// bycrypt
// used to secure/hash passwords in our database
// JWT- Json Web token.... used to authenticate user and generate a token

const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Please Provide a Username" });
  }
  if (!email) {
    return res.status(400).json({ message: "Please Provide an Email" });
  }
  if (!password) {
    return res.status(400).json({ message: "Please Provide a Password" });
  }

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      const conflicts = [];
      if (existingUser.username === username)
        conflicts.push("Username already exists");
      if (existingUser.email === email) conflicts.push("Email already exists");

      return res.status(400).json({
        message: conflicts.join(" and "),
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.status(200).json({
      message: "success",
      user: { username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while registering" });
  }
};
const signInUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: "User doesn't exist" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Wrong Password" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  res.status(200).json({
    message: "success",
    user: { username: user.username, email: user.email },
    token,
  });
};

const getUser = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findOne({ _id: userId });

  res.json({
    user: {
      username: user.username,
      email: user.email,
    },
  });
};

module.exports = { registerUser, signInUser, getUser };

// bQJzROftoTu0ysgj
