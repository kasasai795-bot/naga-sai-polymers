const express = require("express");

const router = express.Router();

const verifyAdmin = require("../middleware/authMiddleware");

const {
  getInventory,
  stockIn,
  stockOut,
  getInventoryStats,
} = require("../controllers/inventoryController");

// ==========================
// Protected Admin Routes
// ==========================

// Inventory Dashboard
router.get("/stats", verifyAdmin, getInventoryStats);

// Inventory List
router.get("/", verifyAdmin, getInventory);

// Stock In
router.post("/stock-in", verifyAdmin, stockIn);

// Stock Out
router.post("/stock-out", verifyAdmin, stockOut);

module.exports = router;