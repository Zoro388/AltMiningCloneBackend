const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 4000;

// Import Routers
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter"); // Import Product Router

// Import Middlewares
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/error");

// Middleware Setup
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRouter); // Auth Routes
app.use("/api/products", productRouter ); // Product Routes

// Error Handling
app.use(errorHandler);
app.use(notFound);

// Start Server
const start = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
    app.listen(port, () => {
      console.log(`Server is Listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(`Could not connect due to ${error.message}`);
  }
};
  
start();
