-- CreateTable
CREATE TABLE "Production" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "stage" TEXT NOT NULL DEFAULT 'Pending',
    "status" TEXT NOT NULL DEFAULT 'In Production',
    "startDate" TIMESTAMP(3),
    "expectedDate" TIMESTAMP(3),
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Production_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Production_orderId_key" ON "Production"("orderId");

-- AddForeignKey
ALTER TABLE "Production" ADD CONSTRAINT "Production_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
