const express = require("express");

const router = express.Router();

const verifyAdmin = require("../middleware/authMiddleware");

const {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

// Get all customers
router.get("/", verifyAdmin, getCustomers);

// Get customer by ID
router.get("/:id", verifyAdmin, getCustomerById);

// Create customer
router.post("/", verifyAdmin, createCustomer);

// Update customer
router.put("/:id", verifyAdmin, updateCustomer);

// Delete customer
router.delete("/:id", verifyAdmin, deleteCustomer);

module.exports = router;