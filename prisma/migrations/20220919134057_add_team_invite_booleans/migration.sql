-- AlterTable
ALTER TABLE "TeamInvite" ADD COLUMN     "isAccepted" BOOLEAN DEFAULT false,
ADD COLUMN     "isExpired" BOOLEAN DEFAULT false;
