const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =======================
// Admin Login
// =======================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login Successful",
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =======================
// Change Password
// =======================
const changePassword = async (req, res) => {
  try {
    const adminId = req.admin.id;

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    const admin = await prisma.admin.findUnique({
      where: {
        id: adminId,
      },
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    await prisma.admin.update({
      where: {
        id: adminId,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.json({
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  loginAdmin,
  changePassword,
};