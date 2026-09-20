const prisma = require("../config/prisma");

// ========================
// Get All Customers
// ========================
const getCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(customers);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch customers",
    });
  }
};

// ========================
// Get Customer By ID
// ========================
const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        orders: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const totalOrders = customer.orders.length;

    const totalPurchase = customer.orders.reduce(
      (sum, order) => sum + order.grandTotal,
      0
    );

    res.json({
      ...customer,
      totalOrders,
      totalPurchase,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch customer",
    });
  }
};

// ========================
// Create Customer
// ========================
const createCustomer = async (req, res) => {
  try {
    const {
      customerName,
      companyName,
      email,
      phone,
      address,
      gstNumber,
    } = req.body;

    const customer = await prisma.customer.create({
      data: {
        customerName,
        companyName,
        email,
        phone,
        address,
        gstNumber,
      },
    });

    res.status(201).json(customer);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create customer",
    });
  }
};

// ========================
// Update Customer
// ========================
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      customerName,
      companyName,
      email,
      phone,
      address,
      gstNumber,
    } = req.body;

    const customer = await prisma.customer.update({
      where: {
        id: Number(id),
      },
      data: {
        customerName,
        companyName,
        email,
        phone,
        address,
        gstNumber,
      },
    });

    res.json(customer);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update customer",
    });
  }
};

// ========================
// Delete Customer
// ========================
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.customer.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Customer deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to delete customer",
    });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};