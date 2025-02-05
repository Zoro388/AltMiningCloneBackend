const multer = require("multer");

const storage = multer.memoryStorage(); // Use memory storage (or diskStorage if needed)

// ✅ Create a multer instance with the storage engine
const upload = multer({ storage });

module.exports = upload; // ✅ Export the multer instance, NOT just the storage
