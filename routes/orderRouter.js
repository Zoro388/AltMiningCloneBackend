const express = require("express");
const {
  getAllOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
  createOrder,

} = require("../controllers/orderController"); // Import controller functions
const methodNotAllowed = require("../utilis/methodNotAllowed"); // Handle unsupported HTTP methods
// const auth = require("../middlewares/auth"); // Authentication middleware

const router = express.Router();

  // Route to get all orders
router
.route("/").get(getAllOrders)
.post(createOrder) // Allows POST method for creating product
.all(methodNotAllowed); // Reject other HTTP methods



router
  .route("/:id")
  .get(getOrder)
  .patch(updateOrderStatus)
  .delete(deleteOrder)
  .all(methodNotAllowed);

module.exports = router; // Export router to be used in app.js or server.js


module.exports = router;
