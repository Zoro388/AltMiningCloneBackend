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

// const getUser = async (req, res) => {
//   const { userId } = req.user;

//   const user = await User.findOne({ _id: userId });

//   res.json({
//     user: {
//       username: user.username,
//       email: user.email,
//     },
//   });
// };

const getUserById = async (req, res) => {
  const { id } = req.params; // Extract the user ID from the route parameters

  try {
    // Fetch the user from the database using the ID
    const user = await User.findById(id);

    // If the user is not found, return a 404 response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user is found, return the user details
    res.status(200).json({
      message: "User fetched successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    // Handle errors (e.g., invalid ObjectId format, database issues)
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the user" });
  }
};
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, { password: 0 }); // Exclude the password field for security

    // Check if no users are found
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Return the list of users
    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    // Handle errors (e.g., database issues)
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching users" });
  }
};

module.exports = {
  registerUser,
  signInUser,
  // getUser,
  getUserById,
  getAllUsers,
};

// bQJzROftoTu0ysgj
