/*
  Warnings:

  - You are about to drop the `ProjectMapEdges` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectMapEdges" DROP CONSTRAINT "ProjectMapEdges_projectId_fkey";

-- DropTable
DROP TABLE "ProjectMapEdges";

-- CreateTable
CREATE TABLE "ProjectMapEdgesSet" (
    "id" TEXT NOT NULL,
    "data" JSONB,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectMapEdgesSet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMapEdgesSet_id_key" ON "ProjectMapEdgesSet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMapEdgesSet_projectId_key" ON "ProjectMapEdgesSet"("projectId");

-- AddForeignKey
ALTER TABLE "ProjectMapEdgesSet" ADD CONSTRAINT "ProjectMapEdgesSet_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
