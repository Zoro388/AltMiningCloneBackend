// const {Product} = require("../models/product.js");

const { Product } = require("../models/product.js");
const cloudinary = require("../utilis/cloudinaryConfig.js"); // Import Cloudinary

// CREATE A PRODUCT
// const cloudinary = require("cloudinary").v2; // Ensure Cloudinary is properly configured

// Upload image to Cloudinary
const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url); // ✅ Make sure to return the URL
        }
      }
    );
    uploadStream.end(fileBuffer);
  });
};


// CREATE A PRODUCT
const createProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { category, description, name, price, quantity } = req.body;
    if (!category || !description || !name || !price || !quantity || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Upload image to Cloudinary
    const cloudinaryUrl = await uploadToCloudinary(req.file.buffer);
    if (!cloudinaryUrl) {
      console.log("Cloudinary URL:", cloudinaryUrl);
      return res.status(500).json({ message: "Image upload failed" });
    }

    // Save product to database
    const product = await Product.create({
      category,
      description,
      image: cloudinaryUrl, // Store Cloudinary URL in DB
      name,
      price,
      quantity,
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "An error occurred while creating the product" });
  }
};




// // CRETAE A PRODUCT


// const createProduct = async (req, res) => {
//   const { category, description, image, name, price, quantity } = req.body;

//   if (!category || !description || !image || !name || !price || !quantity) {
//     return res.status(400).json({ message: "All fields are required" });
//   }


//   try {
//     const product = await Product.create({
//       category,
//       description,
//       image,
//       name,
//       price,
//       quantity,
//       // user: userId
//     });

//     res.status(201).json({
//       message: "Product created successfully",
//       product,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "An error occurred while creating the product" });
//   }
// };





// FIND ALL PRODUCTS
const allProducts = async (req, res) => {
  const products = await Product.find();
  res.json({
    data: products,
  });
};


const singleProduct = async (req, res) => {
  // const { userId } = req.user;
  const { id } = req.params;

  // console.log("Requested Product ID:", id);
  // console.log("User ID from Request:", userId);

  // const product = await Product.findOne({ _id: id, user: userId });
  const product = await Product.findOne();

  // console.log("Product Found:", product); // Log the result

  if (!product) {
    return res.status(404).json({ message: `No Product with ID: ${id}` });
  }

  res.json({
    data: product,
  });
};


// TO UPDATE A PRODUCT

const updateProduct = async (req, res) => {
  // const { userId } = req.user;
  const { id } = req.params;
  const product = await Product.findOneAndUpdate();
  // const product = await Product.findOneAndUpdate(
  //   { _id: id, user: userId },
  //   { ...req.body }
  // );

  if (!product) {
    return res.status(404).json({ message: `No Product with ID: ${id}` });
  }

  res.json({
    message: "Product Updated",
  });
};


// TO DELETE PRODUCT

const deleteProduct = async (req, res) => {
  // const { userId } = req.user;
  const { id } = req.params;
  const product = await Product.findOneAndDelete();
  // const product = await Product.findOneAndDelete({ _id: id, user: userId });

  if (!product) {
    return res.status(404).json({ message: `No Product with ID: ${id}` });
  }

  res.json({
    message: "Product Deleted",
  });
};

module.exports = {
  createProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
  allProducts,
};
