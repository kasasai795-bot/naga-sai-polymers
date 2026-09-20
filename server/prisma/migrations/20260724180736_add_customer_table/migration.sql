-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "customerName" TEXT NOT NULL,
    "companyName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "gstNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");
