const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 4000;

// const taskRouter = require("./routes/taskRouter");
const authRouter = require("./routes/authRouter");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/error");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRouter);
// app.use("/api/task", taskRouter);
app.use(errorHandler);
app.use(notFound);

// Dummy product data
const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    description: "A high-quality wireless mouse with ergonomic design.",
    price: 25.99,
    stock: 50,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Laptop Backpack",
    description: "Water-resistant backpack with padded compartments.",
    price: 45.99,
    stock: 30,
    category: "Accessories",
  },
  {
    id: 3,
    name: "Bluetooth Headphones",
    description: "Noise-canceling headphones with long battery life.",
    price: 89.99,
    stock: 20,
    category: "Electronics",
  },
];

// Endpoint for fetching products
app.get("/api/products", (req, res) => {
  res.status(200).json({
    success: true,
    data: products,
  });
});

const start = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
    app.listen(4000, () => {
      console.log(`Server is Listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(`Could not connect due to ${error.message}`);
  }
};

start();

// CO FOC
