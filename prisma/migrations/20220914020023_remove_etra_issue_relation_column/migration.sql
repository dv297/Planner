/*
  Warnings:

  - You are about to drop the column `issueId` on the `IssueRelation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "IssueRelation" DROP CONSTRAINT "IssueRelation_issueId_fkey";

-- AlterTable
ALTER TABLE "IssueRelation" DROP COLUMN "issueId";
