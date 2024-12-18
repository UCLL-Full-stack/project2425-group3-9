/*
  Warnings:

  - A unique constraint covering the columns `[firstname]` on the table `Animal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Animal_firstname_key" ON "Animal"("firstname");
