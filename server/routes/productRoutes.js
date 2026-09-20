const express = require("express");

const router = express.Router();

const verifyAdmin = require("../middleware/authMiddleware");

const productController = require("../controllers/productController");

// ==========================
// Public Routes
// ==========================

// Get all products
router.get("/", productController.getAllProducts);

// Get product by ID
router.get("/:id", productController.getProductById);

// ==========================
// Admin Routes
// ==========================

// Create product
router.post("/", verifyAdmin, productController.createProduct);

// Update product
router.put("/:id", verifyAdmin, productController.updateProduct);

// Delete product
router.delete("/:id", verifyAdmin, productController.deleteProduct);

module.exports = router;