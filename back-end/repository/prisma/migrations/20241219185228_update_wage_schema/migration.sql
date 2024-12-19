/*
  Warnings:

  - You are about to alter the column `total` on the `Wage` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `amount` on the `Wage` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `bonus` on the `Wage` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Animal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Wage" ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "total" SET DATA TYPE INTEGER,
ALTER COLUMN "amount" SET DATA TYPE INTEGER,
ALTER COLUMN "bonus" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Wage_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
