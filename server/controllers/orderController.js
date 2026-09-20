const { PrismaClient } = require("@prisma/client");
const { createNotification } = require("./notificationController");

const prisma = new PrismaClient();

// ============================
// Create Order
// ============================
exports.createOrder = async (req, res) => {
  try {
    const {
      orderNumber,
      customerName,
      companyName,
      email,
      phone,
      productName,
      quantity,
      dimensions,
      packingPurpose,
      deliveryDate,
      requirements,
      status,
      items,
    } = req.body;

    // ----------------------------
    // Validate customer
    // ----------------------------
    if (!customerName || !customerName.trim()) {
      return res.status(400).json({
        error: "Customer name is required",
      });
    }

    // ----------------------------
    // Find existing customer
    // ----------------------------
    let customer = null;

    if (email) {
      customer = await prisma.customer.findUnique({
        where: {
          email,
        },
      });
    }

    if (!customer && phone) {
      customer = await prisma.customer.findUnique({
        where: {
          phone,
        },
      });
    }

    // ----------------------------
    // Create customer if not found
    // ----------------------------
    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          customerName,
          companyName: companyName || null,
          email: email || null,
          phone: phone || null,
        },
      });
    }

    // ----------------------------
    // Generate order number
    // ----------------------------
    let finalOrderNumber = orderNumber;

    if (!finalOrderNumber) {
      const year = new Date().getFullYear();

      finalOrderNumber = `NSP-${year}-${Date.now()
        .toString()
        .slice(-6)}`;
    }

    // ----------------------------
    // Prepare order items
    // ----------------------------
    let orderItems = [];

    // ADMIN ORDER
    if (Array.isArray(items) && items.length > 0) {
      orderItems = items.map((item) => {
        const itemQuantity = Number(item.quantity) || 0;
        const unitPrice = Number(item.unitPrice) || 0;

        return {
          productId: Number(item.productId),
          quantity: itemQuantity,
          unitPrice,
          totalAmount: itemQuantity * unitPrice,
        };
      });
    }

    // PUBLIC QUOTE
    else if (productName && quantity) {
      const product = await prisma.product.findFirst({
        where: {
          name: productName,
        },
      });

      if (!product) {
        return res.status(404).json({
          error: `Product "${productName}" not found`,
        });
      }

      const itemQuantity = Number(quantity);

      if (!itemQuantity || itemQuantity <= 0) {
        return res.status(400).json({
          error: "Quantity must be greater than zero",
        });
      }

      orderItems = [
        {
          productId: product.id,
          quantity: itemQuantity,
          unitPrice: 0,
          totalAmount: 0,
        },
      ];
    }

    else {
      return res.status(400).json({
        error: "Product and quantity are required",
      });
    }

    // ----------------------------
    // Calculate total
    // ----------------------------
    const grandTotal = orderItems.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );

    // ----------------------------
    // Create Order
    // ----------------------------
    const order = await prisma.order.create({
      data: {
        orderNumber: finalOrderNumber,

        customerId: customer.id,

        customerName,
        companyName: companyName || null,
        email: email || null,
        phone: phone || null,

        dimensions: dimensions || null,
        packingPurpose: packingPurpose || null,

        deliveryDate: deliveryDate
          ? new Date(deliveryDate)
          : null,

        requirements: requirements || null,

        status: status || "Pending",

        grandTotal,

        items: {
          create: orderItems,
        },
      },

      include: {
        customer: true,

        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // ----------------------------
    // Notification
    // ----------------------------
    try {
      await createNotification(
        "New Order",
        `${order.orderNumber} created by ${order.customerName}`,
        "ORDER",
        "High",
        "/admin/orders"
      );
    } catch (notificationError) {
      console.error(
        "Notification Error:",
        notificationError
      );
    }

    // ----------------------------
    // Create Production Record
    // ----------------------------
    try {
      await prisma.production.create({
        data: {
          orderId: order.id,

          // New orders always start as Pending
          stage: "Pending",
          status: "Pending",

          startDate: null,

          expectedDate: deliveryDate
            ? new Date(deliveryDate)
            : null,

          remarks: "",
        },
      });
    } catch (productionError) {
      console.error(
        "Production Creation Error:",
        productionError
      );
    }

    // ----------------------------
    // Response
    // ----------------------------
    res.status(201).json(order);

  } catch (err) {
    console.error("Create Order Error:", err);

    // Prisma duplicate error
    if (err.code === "P2002") {
      return res.status(409).json({
        error: "Customer information already exists",
      });
    }

    res.status(500).json({
      error: "Failed to create order",
    });
  }
};


// ============================
// Get All Orders
// ============================
exports.getOrders = async (req, res) => {
  console.log("GET /api/orders called");

  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        invoice: true,

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

    res.json(orders);

  } catch (err) {
    console.error("Get Orders Error:", err);

    res.status(500).json({
      error: "Failed to fetch orders",
    });
  }
};


// ============================
// Get Single Order
// ============================
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: {
        id: Number(id),
      },

      include: {
        customer: true,
        invoice: true,

        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    res.json(order);

  } catch (err) {
    console.error("Get Order Error:", err);

    res.status(500).json({
      error: "Failed to fetch order",
    });
  }
};


// ============================
// Update Order Status
// ============================
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        error: "Status is required",
      });
    }

    const order = await prisma.order.update({
      where: {
        id: Number(id),
      },

      data: {
        status,
      },
    });

    res.json(order);

  } catch (err) {
    console.error("Update Order Error:", err);

    res.status(500).json({
      error: "Failed to update order",
    });
  }
};


// ============================
// Delete Order
// ============================
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.order.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Order deleted successfully",
    });

  } catch (err) {
    console.error("Delete Order Error:", err);

    res.status(500).json({
      error: "Failed to delete order",
    });
  }
};