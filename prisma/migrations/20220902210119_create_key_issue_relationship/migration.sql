/*
  Warnings:

  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - Made the column `projectId` on table `Issue` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_projectId_fkey";

-- AlterTable
ALTER TABLE "Issue" ALTER COLUMN "projectId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
DROP COLUMN "title";

-- CreateTable
CREATE TABLE "KeyIssue" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "issueStatus" "IssueStatus" NOT NULL DEFAULT 'PLANNING',
    "projectId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "KeyIssue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KeyIssue_id_key" ON "KeyIssue"("id");

-- CreateIndex
CREATE UNIQUE INDEX "KeyIssue_projectId_key" ON "KeyIssue"("projectId");

-- AddForeignKey
ALTER TABLE "KeyIssue" ADD CONSTRAINT "KeyIssue_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeyIssue" ADD CONSTRAINT "KeyIssue_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
