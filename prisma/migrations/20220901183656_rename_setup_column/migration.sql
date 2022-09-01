/*
  Warnings:

  - You are about to drop the column `has_finished_setup` on the `UserPreference` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserPreference" DROP COLUMN "has_finished_setup",
ADD COLUMN     "hasFinishedSetup" BOOLEAN DEFAULT false;
