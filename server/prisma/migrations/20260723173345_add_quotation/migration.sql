-- CreateTable
CREATE TABLE "Quotation" (
    "id" SERIAL NOT NULL,
    "quotationNumber" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "companyName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "productName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "requirements" TEXT,
    "deliveryDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quotation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quotation_quotationNumber_key" ON "Quotation"("quotationNumber");
