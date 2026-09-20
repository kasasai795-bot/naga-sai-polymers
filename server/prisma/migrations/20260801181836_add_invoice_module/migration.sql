-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "customerId" INTEGER,
    "invoiceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "cgst" DOUBLE PRECISION NOT NULL,
    "sgst" DOUBLE PRECISION NOT NULL,
    "igst" DOUBLE PRECISION NOT NULL,
    "grandTotal" DOUBLE PRECISION NOT NULL,
    "paymentStatus" TEXT NOT NULL DEFAULT 'Unpaid',
    "vehicleNumber" TEXT,
    "dispatchMode" TEXT,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceItem" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "InvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "Invoice"("invoiceNumber");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
