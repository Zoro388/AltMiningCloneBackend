const Order = require('../models/order'); // Import the Order model

// CREATE AN ORDER

const createOrder = async (req, res) => {
  const { userEmail, userPhoneNumber, ownerAddress, products, message } = req.body;

  // Validate required fields
  if (!userEmail || !userPhoneNumber || !ownerAddress || !products || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Ensure products is an array and not empty
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Products array cannot be empty" });
  }

  // Validate each product object
  for (let product of products) {
    if (!product.productName || !product.productCategory || !product.price || !product.quantity) {
      return res.status(400).json({
        message: "Each product must have productName, productCategory, price, and quantity",
      });
    }
  }

  try {
    const totalAmount = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

    const order = await Order.create({
      userEmail,
      userPhoneNumber,
      ownerAddress,
      products,
      message,
      totalAmount,
    });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the order" });
  }
};


// GET A SINGLE ORDER
const getOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: `Order with ID: ${id} not found` });
    }

    res.json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving order" });
  }
};

// GET ALL ORDERS
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving orders" });
  }
};

// UPDATE ORDER STATUS (Pending → Shipped)
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // New status like 'Shipped'

  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: `Order with ID: ${id} not found` });
    }

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order status" });
  }
};

// DELETE ORDER
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: `Order with ID: ${id} not found` });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting order" });
  }
};

module.exports = {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
