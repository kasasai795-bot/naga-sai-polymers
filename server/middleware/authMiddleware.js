const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Access Denied",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access Denied",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from environment variables");

      return res.status(500).json({
        message: "Server configuration error",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.admin = decoded;

    next();

  } catch (error) {
    console.error("Authentication error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = verifyAdmin;