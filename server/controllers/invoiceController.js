const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ===============================
// Get All Invoices
// ===============================
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        order: true,
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(invoices);
  } catch (err) {
    console.error("Get Invoices Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ===============================
// Get Invoice By ID
// ===============================
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        order: true,
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    res.json(invoice);
  } catch (err) {
    console.error("Get Invoice Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ===============================
// Create Invoice
// ===============================
exports.createInvoice = async (req, res) => {
  try {
    const {
      orderId,
      customerId,
      invoiceNumber,
      vehicleNumber,
      dispatchMode,
      remarks,
      paymentStatus,
      items,
    } = req.body;

    // Prevent duplicate invoice for same order
    const existingInvoice = await prisma.invoice.findUnique({
      where: {
        orderId: Number(orderId),
      },
    });

    if (existingInvoice) {
      return res.status(409).json({
        message: "Invoice already exists for this order.",
        invoiceId: existingInvoice.id,
      });
    }

    let subtotal = 0;

    const invoiceItems = items.map((item) => {
      const amount =
        Number(item.quantity) * Number(item.unitPrice);

      subtotal += amount;

      return {
        productId: Number(item.productId),
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
        amount,
      };
    });

    const cgst = subtotal * 0.09;
    const sgst = subtotal * 0.09;
    const igst = 0;

    const grandTotal = subtotal + cgst + sgst;

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        orderId: Number(orderId),
        customerId: Number(customerId),

        subtotal,
        cgst,
        sgst,
        igst,
        grandTotal,

        vehicleNumber,
        dispatchMode,
        remarks,

        paymentStatus: paymentStatus || "Unpaid",

        items: {
          create: invoiceItems,
        },
      },
      include: {
        order: true,
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.status(201).json(invoice);
  } catch (err) {
    console.error("Create Invoice Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ===============================
// Update Payment Status
// ===============================
exports.updatePaymentStatus = async (req, res) => {
  try {
    const invoice = await prisma.invoice.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        paymentStatus: req.body.paymentStatus,
      },
    });

    res.json(invoice);
  } catch (err) {
    console.error("Update Payment Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ===============================
// Delete Invoice
// ===============================
exports.deleteInvoice = async (req, res) => {
  try {
    await prisma.invoice.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Invoice deleted successfully",
    });
  } catch (err) {
    console.error("Delete Invoice Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};