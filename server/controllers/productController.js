const { PrismaClient } = require("@prisma/client");
const { createNotification } = require("./notificationController");

const prisma = new PrismaClient();

// ================================
// Get All Products
// ================================
exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

// ================================
// Get Product By ID
// ================================
exports.getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Get Product Error:", error);
    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};

// ================================
// Create Product
// ================================
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      gsm,
      size,
      color,
      printing,
      lamination,
      description,
      image,
      status,
    } = req.body;

    const product = await prisma.product.create({
  data: {
    name,
    category,
    gsm,
    size,
    color,
    printing,
    lamination: lamination === true || lamination === "true",
    description,
    image,
    status: status || "Active",
  },
});

// Automatically create inventory record
await prisma.inventory.create({
  data: {
    productId: product.id,
    quantity: 0,
    minimumStock: 50,
  },
});

    res.status(201).json(product);
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({
      message: "Failed to create product",
    });
  }
};

// ================================
// Update Product
// ================================
exports.updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      name,
      category,
      gsm,
      size,
      color,
      printing,
      lamination,
      description,
      image,
      status,
    } = req.body;

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        category,
        gsm,
        size,
        color,
        printing,
        lamination: lamination === true || lamination === "true",
        description,
        image,
        status,
      },
    });
    

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

// ================================
// Delete Product
// ================================
exports.deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.product.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({
      message: "Failed to delete product",
    });
  }
};