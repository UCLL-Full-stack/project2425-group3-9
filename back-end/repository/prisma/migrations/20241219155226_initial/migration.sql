/*
  Warnings:

  - You are about to drop the column `adressId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_adressId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "adressId",
ADD COLUMN     "addressId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
