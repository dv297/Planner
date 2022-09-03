-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "workspaceIssueCount" INTEGER DEFAULT -1;

-- AlterTable
ALTER TABLE "KeyIssue" ADD COLUMN     "workspaceIssueCount" INTEGER DEFAULT -1;
