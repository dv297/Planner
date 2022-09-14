/*
  Warnings:

  - Added the required column `projectId` to the `IssueRelation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IssueRelation" ADD COLUMN     "projectId" TEXT NOT NULL;
