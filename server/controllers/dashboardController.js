const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getDashboardStats = async (req, res) => {
  try {
    // Fetch everything in parallel
    const [
      products,
      customers,
      invoices,
      allOrders,
      recentOrdersData,
    ] = await Promise.all([
      prisma.product.findMany(),

      prisma.customer.findMany(),

      prisma.invoice.findMany(),

      prisma.order.findMany(),

      prisma.order.findMany({
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),
    ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyOrders = monthNames.map((month, index) => ({
      month,
      orders: allOrders.filter(
        (order) =>
          new Date(order.createdAt).getMonth() === index
      ).length,
    }));

    const recentOrders = recentOrdersData.map((order) => ({
      id: order.id,

      customerName: order.customerName,

      companyName: order.companyName,

      productName:
        order.items.length > 0
          ? order.items[0].product.name
          : "-",

      quantity: order.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),

      status: order.status,

      deliveryDate: order.deliveryDate
        ? order.deliveryDate.toISOString().split("T")[0]
        : "-",
    }));

    const totalRevenue = invoices.reduce(
      (sum, invoice) => sum + invoice.grandTotal,
      0
    );

    res.json({
      totalProducts: products.length,

      totalCustomers: customers.length,

      totalInvoices: invoices.length,

      totalRevenue,

      totalOrders: allOrders.length,

      pendingOrders: allOrders.filter(
        (order) => order.status === "Pending"
      ).length,

      inProgressOrders: allOrders.filter(
        (order) => order.status === "In Progress"
      ).length,

      completedOrders: allOrders.filter(
        (order) => order.status === "Completed"
      ).length,

      monthlyOrders,

      recentOrders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};