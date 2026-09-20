/*
  Warnings:

  - You are about to drop the column `productName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderNumber]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderNumber` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "productName",
DROP COLUMN "quantity",
ADD COLUMN     "grandTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "orderNumber" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
