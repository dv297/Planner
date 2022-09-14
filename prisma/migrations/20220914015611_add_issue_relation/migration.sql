-- CreateEnum
CREATE TYPE "IssueRelationType" AS ENUM ('DEPENDS_ON', 'RELATES_TO');

-- CreateTable
CREATE TABLE "IssueRelation" (
    "sourceIssueId" TEXT NOT NULL,
    "targetIssueId" TEXT NOT NULL,
    "issueRelationType" "IssueRelationType" NOT NULL DEFAULT 'DEPENDS_ON',
    "issueId" TEXT,

    CONSTRAINT "IssueRelation_pkey" PRIMARY KEY ("sourceIssueId","targetIssueId")
);

-- AddForeignKey
ALTER TABLE "IssueRelation" ADD CONSTRAINT "IssueRelation_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
