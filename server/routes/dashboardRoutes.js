const express = require("express");
const router = express.Router();

const verifyAdmin = require("../middleware/authMiddleware");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

router.get(
  "/stats",
  verifyAdmin,
  getDashboardStats
);

module.exports = router;