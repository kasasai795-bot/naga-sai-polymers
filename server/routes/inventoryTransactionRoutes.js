const express = require("express");

const router = express.Router();

const verifyAdmin = require("../middleware/authMiddleware");

const {
  getTransactions,
} = require("../controllers/inventoryTransactionController");

// Admin Only
router.get("/", verifyAdmin, getTransactions);

module.exports = router;