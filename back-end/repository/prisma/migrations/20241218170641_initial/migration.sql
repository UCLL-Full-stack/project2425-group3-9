/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Workspace_id_key" ON "Workspace"("id");
