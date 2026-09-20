const express = require("express");

const router = express.Router();

const verifyAdmin = require("../middleware/authMiddleware");

const {
  getQuotations,
  getQuotationById,
  createQuotation,
  updateQuotation,
  deleteQuotation,
} = require("../controllers/quotationController");

// Admin Only
router.get("/", verifyAdmin, getQuotations);

router.get("/:id", verifyAdmin, getQuotationById);

router.post("/", verifyAdmin, createQuotation);

router.put("/:id", verifyAdmin, updateQuotation);

router.delete("/:id", verifyAdmin, deleteQuotation);

module.exports = router;