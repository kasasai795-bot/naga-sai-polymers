-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "color" TEXT,
ADD COLUMN     "gsm" TEXT,
ADD COLUMN     "lamination" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "printing" TEXT,
ADD COLUMN     "size" TEXT;
