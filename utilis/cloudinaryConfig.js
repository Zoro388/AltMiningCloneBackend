const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // Load environment variables

// Debugging: Check if the API key is loaded
// console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

module.exports = cloudinary;
