const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  changePassword,
} = require("../controllers/adminController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);

router.put(
  "/change-password",
  verifyToken,
  changePassword
);

module.exports = router;