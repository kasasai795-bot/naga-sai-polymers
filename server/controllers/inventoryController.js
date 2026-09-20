const { PrismaClient } = require("@prisma/client");
const { createNotification } = require("./notificationController");

const prisma = new PrismaClient();

// =======================================
// Get Inventory
// =======================================
exports.getInventory = async (req, res) => {
  try {
    const inventory = await prisma.inventory.findMany({
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(inventory);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch inventory",
    });
  }
};

// =======================================
// Stock In
// =======================================
exports.stockIn = async (req, res) => {
  try {
    const { inventoryId, quantity, remarks } = req.body;

    const inventory = await prisma.inventory.update({
      where: {
        id: Number(inventoryId),
      },
      data: {
        quantity: {
          increment: Number(quantity),
        },
        transactions: {
          create: {
            type: "IN",
            quantity: Number(quantity),
            remarks,
          },
        },
      },
      include: {
        product: true,
      },
    });

    if (inventory.quantity <= inventory.minimumStock) {
      await createNotification(
        "Low Stock Alert",
        `${inventory.product.name} stock is low`,
        "INVENTORY",
        "High",
        "/admin/inventory"
      );
    }

    res.json(inventory);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update stock",
    });
  }
};

// =======================================
// Stock Out
// =======================================
exports.stockOut = async (req, res) => {
  try {
    const { inventoryId, quantity, remarks } = req.body;

    const existingInventory = await prisma.inventory.findUnique({
      where: {
        id: Number(inventoryId),
      },
      include: {
        product: true,
      },
    });

    if (!existingInventory) {
      return res.status(404).json({
        message: "Inventory not found",
      });
    }

    if (existingInventory.quantity < Number(quantity)) {
      return res.status(400).json({
        message: "Not enough stock available",
      });
    }

    const inventory = await prisma.inventory.update({
      where: {
        id: Number(inventoryId),
      },
      data: {
        quantity: {
          decrement: Number(quantity),
        },
        transactions: {
          create: {
            type: "OUT",
            quantity: Number(quantity),
            remarks,
          },
        },
      },
      include: {
        product: true,
      },
    });

    if (inventory.quantity <= inventory.minimumStock) {
      await createNotification(
        "Low Stock Alert",
        `${inventory.product.name} stock is low`,
        "INVENTORY",
        "High",
        "/admin/inventory"
      );
    }

    res.json(inventory);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update stock",
    });
  }
};

// =======================================
// Inventory Statistics
// =======================================
exports.getInventoryStats = async (req, res) => {
  try {
    const inventory = await prisma.inventory.findMany();

    const totalProducts = inventory.length;

    const totalStock = inventory.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const lowStock = inventory.filter(
      (item) => item.quantity <= item.minimumStock
    ).length;

    res.json({
      totalProducts,
      totalStock,
      lowStock,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch inventory statistics",
    });
  }
};