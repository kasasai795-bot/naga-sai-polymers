const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ================================
// Get All Production
// ================================
exports.getAllProduction = async (req, res) => {
  try {
    const data = await prisma.production.findMany({
      include: {
        order: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(data);
  } catch (err) {
    console.error("Get Production Error:", err);

    res.status(500).json({
      message: "Failed to fetch production records",
    });
  }
};

// ================================
// Get Production By ID
// ================================
exports.getProductionById = async (req, res) => {
  try {
    const data = await prisma.production.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        order: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!data) {
      return res.status(404).json({
        message: "Production not found",
      });
    }

    res.json(data);
  } catch (err) {
    console.error("Get Production By ID Error:", err);

    res.status(500).json({
      message: "Failed to fetch production record",
    });
  }
};

// ================================
// Update Production
// ================================
exports.updateProduction = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      stage,
      remarks,
      startDate,
      expectedDate,
    } = req.body;

    // Determine status automatically from stage
    let status = "In Production";

    if (stage === "Pending") {
      status = "Pending";
    } else if (stage === "In Production") {
      status = "In Production";
    } else if (stage === "Quality Check") {
      status = "In Production";
    } else if (stage === "Completed") {
      status = "Completed";
    }

    const updated = await prisma.production.update({
      where: {
        id,
      },
      data: {
        stage,
        status,
        remarks,
        startDate: startDate
          ? new Date(startDate)
          : undefined,
        expectedDate: expectedDate
          ? new Date(expectedDate)
          : undefined,
      },
    });

    // Keep Order status synchronized
    let orderStatus = "Pending";

    if (stage === "Pending") {
      orderStatus = "Pending";
    } else if (
      stage === "In Production" ||
      stage === "Quality Check"
    ) {
      orderStatus = "In Production";
    } else if (stage === "Completed") {
      orderStatus = "Completed";
    }

    await prisma.order.update({
      where: {
        id: updated.orderId,
      },
      data: {
        status: orderStatus,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error("Update Production Error:", err);

    res.status(500).json({
      message: "Failed to update production",
    });
  }
};

// ================================
// Delete Production
// ================================
exports.deleteProduction = async (req, res) => {
  try {
    await prisma.production.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Production deleted successfully",
    });
  } catch (err) {
    console.error("Delete Production Error:", err);

    res.status(500).json({
      message: "Failed to delete production",
    });
  }
};