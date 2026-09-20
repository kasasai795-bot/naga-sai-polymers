-- CreateTable
CREATE TABLE "CompanySettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "companyName" TEXT NOT NULL,
    "gstNumber" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "invoicePrefix" TEXT NOT NULL DEFAULT 'NSP',
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanySettings_pkey" PRIMARY KEY ("id")
);
