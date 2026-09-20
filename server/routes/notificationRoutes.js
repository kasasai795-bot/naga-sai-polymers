const express = require("express");

const router = express.Router();

const verifyAdmin = require("../middleware/authMiddleware");

const {
  getNotifications,
  markAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

// Admin Only
router.get("/", verifyAdmin, getNotifications);

router.patch("/:id", verifyAdmin, markAsRead);

router.delete("/:id", verifyAdmin, deleteNotification);

module.exports = router;