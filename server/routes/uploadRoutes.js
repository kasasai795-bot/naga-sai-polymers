const express = require("express");
const upload = require("../middleware/multer");

const router = express.Router();

// Upload a single image
router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Image upload failed",
    });
  }
});

module.exports = router;