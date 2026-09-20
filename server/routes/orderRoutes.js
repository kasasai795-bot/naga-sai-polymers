const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middleware/authMiddleware");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

// Public - Customer submits quote
router.post("/", createOrder);

// Protected - Admin only
router.get("/", verifyAdmin, getOrders);

router.get("/:id", verifyAdmin, getOrderById);

router.patch("/:id/status", verifyAdmin, updateOrderStatus);

router.delete("/:id", verifyAdmin, deleteOrder);

module.exports = router;