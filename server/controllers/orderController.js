const prisma = require("../config/prisma");

const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      companyName,
      email,
      phone,
      productName,
      quantity,
      requirements,
      deliveryDate,
    } = req.body;

    const order = await prisma.order.create({
      data: {
        customerName,
        companyName,
        email,
        phone,
        productName,
        quantity: Number(quantity),
        requirements,
        deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating order",
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching orders",
    });
  }
};

// ✅ Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating order status",
    });
  }
};
// ✅ Delete Order
const deleteOrder = async (req, res) => {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting order",
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
};