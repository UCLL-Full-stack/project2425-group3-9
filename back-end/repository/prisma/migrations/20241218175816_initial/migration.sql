/*
  Warnings:

  - You are about to drop the column `userId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Wage` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Workspace` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[workspaceId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wageId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wageId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspaceId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Wage" DROP CONSTRAINT "Wage_userId_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_userId_fkey";

-- DropIndex
DROP INDEX "Address_userId_key";

-- DropIndex
DROP INDEX "Profile_userId_key";

-- DropIndex
DROP INDEX "Wage_userId_key";

-- DropIndex
DROP INDEX "Workspace_userId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "addressId" INTEGER NOT NULL,
ADD COLUMN     "profileId" INTEGER NOT NULL,
ADD COLUMN     "wageId" INTEGER NOT NULL,
ADD COLUMN     "workspaceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Wage" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "User_profileId_key" ON "User"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "User_addressId_key" ON "User"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "User_workspaceId_key" ON "User"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "User_wageId_key" ON "User"("wageId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_wageId_fkey" FOREIGN KEY ("wageId") REFERENCES "Wage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
