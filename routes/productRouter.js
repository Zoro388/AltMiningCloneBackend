const express = require("express");
const {
  createProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
  allProducts,

} = require("../controllers/productController"); // Import controller functions
const methodNotAllowed = require("../utilis/methodNotAllowed"); // Handle unsupported HTTP methods
// const auth = require("../middlewares/auth"); // Authentication middleware

const router = express.Router();

  // Route to create a product
router
.route("/").get(allProducts)
.post(createProduct) // Allows POST method for creating product
.all(methodNotAllowed); // Reject other HTTP methods



router
  .route("/:id")
  .get(singleProduct)
  .patch(updateProduct)
  .delete(deleteProduct)
  .all(methodNotAllowed);

module.exports = router; // Export router to be used in app.js or server.js
