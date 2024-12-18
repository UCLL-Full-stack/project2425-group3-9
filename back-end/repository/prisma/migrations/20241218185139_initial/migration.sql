-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Animal_pkey" PRIMARY KEY ("id");
