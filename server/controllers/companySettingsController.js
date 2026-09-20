const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// =============================
// Get Company Settings
// =============================
exports.getSettings = async (req, res) => {
  try {
    let settings = await prisma.companySettings.findFirst();

    if (!settings) {
      settings = await prisma.companySettings.create({
        data: {
          companyName: "Naga Sai New Polymers",
          invoicePrefix: "NSP",

          gstNumber: "",
          address: "",
          phone: "",
          email: "",
          website: "",
          logo: "",

          bankName: "",
          accountNumber: "",
          ifscCode: "",
          branch: "",

          panNumber: "",
          state: "",

          declaration:
            "We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.",

          authorizedSign: "",
        },
      });
    }

    res.json(settings);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch settings",
    });
  }
};

// =============================
// Update Company Settings
// =============================
exports.updateSettings = async (req, res) => {
  try {
    const {
      companyName,
      gstNumber,
      address,
      phone,
      email,
      website,
      invoicePrefix,
      logo,

      bankName,
      accountNumber,
      ifscCode,
      branch,

      panNumber,
      state,

      declaration,
      authorizedSign,
    } = req.body;

    const existing =
      await prisma.companySettings.findFirst();

    let settings;

    if (existing) {
      settings = await prisma.companySettings.update({
        where: {
          id: existing.id,
        },

        data: {
          companyName,
          gstNumber,
          address,
          phone,
          email,
          website,
          invoicePrefix,
          logo,

          bankName,
          accountNumber,
          ifscCode,
          branch,

          panNumber,
          state,

          declaration,
          authorizedSign,
        },
      });
    } else {
      settings = await prisma.companySettings.create({
        data: {
          companyName,
          gstNumber,
          address,
          phone,
          email,
          website,
          invoicePrefix,
          logo,

          bankName,
          accountNumber,
          ifscCode,
          branch,

          panNumber,
          state,

          declaration,
          authorizedSign,
        },
      });
    }

    res.json(settings);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update settings",
    });
  }
};