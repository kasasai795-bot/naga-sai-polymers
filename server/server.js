require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const customerRoutes = require("./routes/customerRoutes");
const quotationRoutes = require("./routes/quotationRoutes");
const productionRoutes = require("./routes/productionRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

const inventoryTransactionRoutes =
require("./routes/inventoryTransactionRoutes");
const notificationRoutes =
require("./routes/notificationRoutes");
const companySettingsRoutes = require("./routes/companySettingsRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/production", productionRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use(
  "/api/inventory-transactions",
  inventoryTransactionRoutes
);
app.use(
"/api/notifications",
notificationRoutes
);
app.use("/api/settings", companySettingsRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("Naga Sai Polymers Backend Running");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});