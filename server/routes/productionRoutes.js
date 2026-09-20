const express = require("express");

const router = express.Router();

const verifyAdmin = require("../middleware/authMiddleware");

const productionController = require("../controllers/productionController");

// ==========================
// Protected Admin Routes
// ==========================

// Get all production records
router.get("/", verifyAdmin, productionController.getAllProduction);

// Get production by ID
router.get("/:id", verifyAdmin, productionController.getProductionById);

// Update production
router.patch("/:id", verifyAdmin, productionController.updateProduction);

// Delete production
router.delete("/:id", verifyAdmin, productionController.deleteProduction);

module.exports = router;