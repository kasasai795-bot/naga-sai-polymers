-- AlterTable
ALTER TABLE "CompanySettings" ADD COLUMN     "accountNumber" TEXT,
ADD COLUMN     "authorizedSign" TEXT,
ADD COLUMN     "bankName" TEXT,
ADD COLUMN     "branch" TEXT,
ADD COLUMN     "declaration" TEXT DEFAULT 'We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.',
ADD COLUMN     "ifscCode" TEXT,
ADD COLUMN     "panNumber" TEXT,
ADD COLUMN     "state" TEXT;
