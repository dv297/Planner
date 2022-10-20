-- CreateEnum
CREATE TYPE "IssueAuditEntryType" AS ENUM ('COMMENT', 'CHANGE');

-- CreateTable
CREATE TABLE "IssueAuditEntry" (
    "id" TEXT NOT NULL,
    "oldValue" TEXT,
    "newValue" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "IssueAuditEntryType" NOT NULL,
    "wasEdited" BOOLEAN DEFAULT false,
    "issueId" TEXT NOT NULL,

    CONSTRAINT "IssueAuditEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IssueAuditEntry_id_key" ON "IssueAuditEntry"("id");

-- AddForeignKey
ALTER TABLE "IssueAuditEntry" ADD CONSTRAINT "IssueAuditEntry_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
