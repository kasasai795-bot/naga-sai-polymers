/*
  Warnings:

  - You are about to drop the column `productName` on the `Quotation` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Quotation` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Quotation` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `Quotation` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Quotation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quotation" DROP COLUMN "productName",
DROP COLUMN "quantity",
DROP COLUMN "totalAmount",
DROP COLUMN "unitPrice",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "QuotationItem" (
    "id" SERIAL NOT NULL,
    "quotationId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "QuotationItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuotationItem" ADD CONSTRAINT "QuotationItem_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "Quotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
