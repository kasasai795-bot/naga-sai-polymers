/*
  Warnings:

  - You are about to drop the column `productName` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `QuotationItem` table. All the data in the column will be lost.
  - Added the required column `productId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `QuotationItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "productName",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "QuotationItem" DROP COLUMN "productName",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuotationItem" ADD CONSTRAINT "QuotationItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
