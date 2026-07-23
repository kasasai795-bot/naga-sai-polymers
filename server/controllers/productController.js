const prisma = require("../config/prisma");

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Add Product
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      image,
      status,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        category,
        description,
        image,
        status,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      name,
      category,
      description,
      image,
      status,
    } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        category,
        description,
        image,
        status,
      },
    });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.product.delete({
      where: { id },
    });

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};