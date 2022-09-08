-- CreateTable
CREATE TABLE "ProjectMapPosition" (
    "id" TEXT NOT NULL,
    "data" JSONB,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectMapPosition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMapPosition_id_key" ON "ProjectMapPosition"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMapPosition_projectId_key" ON "ProjectMapPosition"("projectId");

-- AddForeignKey
ALTER TABLE "ProjectMapPosition" ADD CONSTRAINT "ProjectMapPosition_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
