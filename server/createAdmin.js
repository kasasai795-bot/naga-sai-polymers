const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const email = "admin@nagasai.com";
    const password = "Admin@123";

    const existing = await prisma.admin.findUnique({
      where: { email },
    });

    if (existing) {
      console.log("Admin already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log("==================================");
    console.log("Admin created successfully!");
    console.log("Email    : admin@nagasai.com");
    console.log("Password : Admin@123");
    console.log("==================================");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();