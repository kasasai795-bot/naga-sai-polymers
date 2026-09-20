const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getTransactions = async (req, res) => {
  try {
    const transactions =
      await prisma.inventoryTransaction.findMany({
        include: {
          inventory: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(transactions);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch transactions",
    });
  }
};
