-- CreateTable
CREATE TABLE "ActiveSprint" (
    "workspaceId" TEXT NOT NULL,
    "sprintId" TEXT NOT NULL,

    CONSTRAINT "ActiveSprint_pkey" PRIMARY KEY ("workspaceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActiveSprint_workspaceId_key" ON "ActiveSprint"("workspaceId");

-- AddForeignKey
ALTER TABLE "ActiveSprint" ADD CONSTRAINT "ActiveSprint_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveSprint" ADD CONSTRAINT "ActiveSprint_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "Sprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
