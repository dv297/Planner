import { IssueAuditEntryType, Prisma } from '@prisma/client';

import prisma from '@src/lib/prisma';

const includeFields: Prisma.IssueAuditEntryInclude = {
  user: true,
};

interface IssueAuditEntryOptions {
  filter?: 'comment' | 'change' | null;
}

const IssueAuditEntryRepo = {
  async getIssueAuditEntriesByIssueId(
    issueId: string,
    options: IssueAuditEntryOptions
  ) {
    let type = undefined;

    switch (options.filter) {
      case 'comment': {
        type = IssueAuditEntryType.COMMENT;
        break;
      }
      case 'change': {
        type = IssueAuditEntryType.CHANGE;
        break;
      }
      default: {
        type = undefined;
      }
    }

    const issueAuditEntries = await prisma.issueAuditEntry.findMany({
      where: {
        issueId,
        type,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: includeFields,
    });

    return issueAuditEntries;
  },
};

export default IssueAuditEntryRepo;
