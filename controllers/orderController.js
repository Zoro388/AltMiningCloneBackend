const Order = require('../models/order'); // Import the Order model

// const { Order } = require("../models/order");
const { Product } = require("../models/product");

const createOrder = async (req, res) => {
  const { userEmail, userPhoneNumber, ownerAddress, products, message, ref, userName } = req.body;

  if (!userEmail || !userName || !userPhoneNumber || !ownerAddress || !products || !message || !ref) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Products array cannot be empty" });
  }

  try {
    // Fetch product details including images from the database
    const productDetails = await Promise.all(
      products.map(async (product) => {
        const foundProduct = await Product.findById(product.id); // Ensure product.id is sent from frontend

        if (!foundProduct) {
          throw new Error(`Product with ID ${product.id} not found`);
        }

        return {
          Name: foundProduct.name,
          Category: foundProduct.category,
          price: foundProduct.price,
          quantity: product.quantity,
          image: foundProduct.image, // Include the product image URL

        };
      })
    );

    const totalAmount = productDetails.reduce((sum, product) => sum + (product.price * product.quantity), 0);

    // Save the order in the database
    const order = await Order.create({
      userEmail,
      userName,
      userPhoneNumber,
      ownerAddress,
      products: productDetails,
      message,
      totalAmount,
      ref,
    });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
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
