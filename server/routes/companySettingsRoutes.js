const express = require("express");

const router = express.Router();

const verifyAdmin = require("../middleware/authMiddleware");

const {
  getSettings,
  updateSettings,
} = require("../controllers/companySettingsController");

// Admin Only
router.get("/", verifyAdmin, getSettings);

router.put("/", verifyAdmin, updateSettings);

module.exports = router;