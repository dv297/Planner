import { IssueAuditEntryType, Prisma } from '@prisma/client';
import { User } from 'next-auth';
import { z } from 'zod';

import prisma from '@src/lib/prisma';
import { IssueAuditEntryCreateBodySchema } from '@src/schemas/IssueSchema';

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
  async createIssueAuditEntry(
    user: User,
    issueId: string,
    createOptions: z.infer<typeof IssueAuditEntryCreateBodySchema>
  ) {
    const issueAuditEntry = await prisma.issueAuditEntry.create({
      data: {
        ...createOptions,
        issueId,
        userId: user.id,
      },
    });

    return issueAuditEntry;
  },
};

export default IssueAuditEntryRepo;
