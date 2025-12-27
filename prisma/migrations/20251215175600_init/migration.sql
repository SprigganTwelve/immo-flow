-- CreateEnum
CREATE TYPE "AttachmentType" AS ENUM ('ThreeDModel', 'Image', 'PDFDocument');

-- CreateEnum
CREATE TYPE "RentType" AS ENUM ('COLLECTIVE', 'INDIVIDUAL');

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "firstNamle" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "attachmentId" INTEGER,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "type" "AttachmentType" NOT NULL DEFAULT 'Image',
    "personId" INTEGER NOT NULL,
    "billId" INTEGER NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Landlord" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "Landlord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankCard" (
    "iban" SERIAL NOT NULL,
    "bankName" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "cardType" TEXT NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,

    CONSTRAINT "BankCard_pkey" PRIMARY KEY ("iban")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "numericCode" INTEGER NOT NULL,
    "symbol" CHAR(1) NOT NULL,
    "name" TEXT NOT NULL,
    "minorUnit" INTEGER NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rent" (
    "id" SERIAL NOT NULL,
    "type" "RentType" NOT NULL DEFAULT 'INDIVIDUAL',
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "tenantId" INTEGER NOT NULL,
    "appartmentId" INTEGER NOT NULL,
    "attachmentId" INTEGER NOT NULL,

    CONSTRAINT "Rent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receipt" (
    "id" SERIAL NOT NULL,
    "paid" DECIMAL(65,30) NOT NULL,
    "rentId" INTEGER NOT NULL,
    "billId" INTEGER NOT NULL,
    "attachmentId" INTEGER NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantBalance" (
    "id" SERIAL NOT NULL,
    "currentDebt" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "TenantBalance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" SERIAL NOT NULL,
    "payout" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "maturyDate" TIMESTAMP(3) NOT NULL,
    "tenantId" INTEGER NOT NULL,
    "attachmentId" INTEGER NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appartment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "inRepair" BOOLEAN NOT NULL,
    "attachmentId" INTEGER,

    CONSTRAINT "Appartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settlement" (
    "id" SERIAL NOT NULL,
    "payout" DECIMAL(65,30) NOT NULL,
    "appartmentId" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,

    CONSTRAINT "Settlement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scheduled" BOOLEAN NOT NULL DEFAULT true,
    "appartmentid" INTEGER NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityLog" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "origin" TEXT NOT NULL,

    CONSTRAINT "SecurityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlacklistedHost" (
    "id" SERIAL NOT NULL,
    "host" TEXT NOT NULL,
    "securityLogId" INTEGER NOT NULL,

    CONSTRAINT "BlacklistedHost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- CreateIndex
CREATE INDEX "Person_attachmentId_idx" ON "Person"("attachmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_personId_key" ON "Attachment"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_billId_key" ON "Attachment"("billId");

-- CreateIndex
CREATE UNIQUE INDEX "BankCard_currencyId_key" ON "BankCard"("currencyId");

-- CreateIndex
CREATE UNIQUE INDEX "Rent_attachmentId_key" ON "Rent"("attachmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Rent_tenantId_appartmentId_key" ON "Rent"("tenantId", "appartmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_billId_key" ON "Receipt"("billId");

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_attachmentId_key" ON "Receipt"("attachmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Bill_attachmentId_key" ON "Bill"("attachmentId");

-- CreateIndex
CREATE INDEX "Bill_attachmentId_idx" ON "Bill"("attachmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Settlement_currencyId_key" ON "Settlement"("currencyId");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_appartmentid_key" ON "Appointment"("appartmentid");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Landlord" ADD CONSTRAINT "Landlord_id_fkey" FOREIGN KEY ("id") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_id_fkey" FOREIGN KEY ("id") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankCard" ADD CONSTRAINT "BankCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankCard" ADD CONSTRAINT "BankCard_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_appartmentId_fkey" FOREIGN KEY ("appartmentId") REFERENCES "Appartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_rentId_fkey" FOREIGN KEY ("rentId") REFERENCES "Rent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantBalance" ADD CONSTRAINT "TenantBalance_id_fkey" FOREIGN KEY ("id") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appartment" ADD CONSTRAINT "Appartment_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_appartmentId_fkey" FOREIGN KEY ("appartmentId") REFERENCES "Appartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_appartmentid_fkey" FOREIGN KEY ("appartmentid") REFERENCES "Appartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlacklistedHost" ADD CONSTRAINT "BlacklistedHost_securityLogId_fkey" FOREIGN KEY ("securityLogId") REFERENCES "SecurityLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
