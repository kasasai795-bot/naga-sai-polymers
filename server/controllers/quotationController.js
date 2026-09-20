const prisma = require("../config/prisma");

// ============================
// Get All Quotations
// ============================
exports.getQuotations = async (req, res) => {
  try {
    const quotations = await prisma.quotation.findMany({
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(quotations);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch quotations",
    });
  }
};

// ============================
// Get Single Quotation
// ============================
exports.getQuotationById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const quotation = await prisma.quotation.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
      },
    });

    if (!quotation) {
      return res.status(404).json({
        message: "Quotation not found",
      });
    }

    res.json(quotation);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch quotation",
    });
  }
};

// ============================
// Create Quotation
// ============================
exports.createQuotation = async (req, res) => {
  try {
    const {
      customerName,
      companyName,
      email,
      phone,
      requirements,
      deliveryDate,
      status,
      items,
    } = req.body;

    const quotationNumber = `QT-${Date.now()}`;

    const quotation = await prisma.quotation.create({
      data: {
        quotationNumber,
        customerName,
        companyName,
        email,
        phone,
        requirements,
        deliveryDate: deliveryDate
          ? new Date(deliveryDate)
          : null,
        status,

        items: {
          create: items.map((item) => ({
            productName: item.productName,
            quantity: Number(item.quantity),
            unitPrice: Number(item.unitPrice),
            totalAmount:
              Number(item.quantity) *
              Number(item.unitPrice),
          })),
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json(quotation);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create quotation",
    });
  }
};

// ============================
// Update Quotation
// ============================
exports.updateQuotation = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      customerName,
      companyName,
      email,
      phone,
      requirements,
      deliveryDate,
      status,
      items,
    } = req.body;

    await prisma.quotationItem.deleteMany({
      where: {
        quotationId: id,
      },
    });

    const quotation = await prisma.quotation.update({
      where: {
        id,
      },
      data: {
        customerName,
        companyName,
        email,
        phone,
        requirements,
        deliveryDate: deliveryDate
          ? new Date(deliveryDate)
          : null,
        status,

        items: {
          create: items.map((item) => ({
            productName: item.productName,
            quantity: Number(item.quantity),
            unitPrice: Number(item.unitPrice),
            totalAmount:
              Number(item.quantity) *
              Number(item.unitPrice),
          })),
        },
      },
      include: {
        items: true,
      },
    });

    res.json(quotation);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update quotation",
    });
  }
};

// ============================
// Delete Quotation
// ============================
exports.deleteQuotation = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.quotation.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Quotation deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete quotation",
    });
  }
};