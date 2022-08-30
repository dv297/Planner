-- CreateTable
CREATE TABLE "TeamWorkspace" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "TeamWorkspace_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamWorkspace_id_key" ON "TeamWorkspace"("id");

-- AddForeignKey
ALTER TABLE "TeamWorkspace" ADD CONSTRAINT "TeamWorkspace_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamWorkspace" ADD CONSTRAINT "TeamWorkspace_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
