const express = require("express");

const router = express.Router();

const verifyAdmin = require("../middleware/authMiddleware");

const {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updatePaymentStatus,
  deleteInvoice,
} = require("../controllers/invoiceController");

// ==========================
// Protected Admin Routes
// ==========================

// Get all invoices
router.get("/", verifyAdmin, getInvoices);

// Get invoice by ID
router.get("/:id", verifyAdmin, getInvoiceById);

// Create invoice
router.post("/", verifyAdmin, createInvoice);

// Update payment status
router.patch("/:id/payment", verifyAdmin, updatePaymentStatus);

// Delete invoice
router.delete("/:id", verifyAdmin, deleteInvoice);

module.exports = router;