const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");

async function createAdmin() {
  try {
    const email = "admin@nagasaipolymers.com";
    const password = "Admin@123";

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      console.log("❌ Admin already exists!");
      return;
    }

    await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log("✅ Admin created successfully!");
    console.log("Email:", email);
    console.log("Password:", password);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();