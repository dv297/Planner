-- CreateTable
CREATE TABLE "ProjectMapEdges" (
    "id" TEXT NOT NULL,
    "data" JSONB,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectMapEdges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMapEdges_id_key" ON "ProjectMapEdges"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMapEdges_projectId_key" ON "ProjectMapEdges"("projectId");

-- AddForeignKey
ALTER TABLE "ProjectMapEdges" ADD CONSTRAINT "ProjectMapEdges_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
