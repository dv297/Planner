/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserPreference` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");
