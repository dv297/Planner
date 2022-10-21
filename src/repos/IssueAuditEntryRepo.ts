import { IssueAuditEntryType, Prisma } from '@prisma/client';
import { User } from 'next-auth';
import { z } from 'zod';

import prisma from '@src/lib/prisma';
import SprintRepo from '@src/repos/SprintRepo';
import UserRepo from '@src/repos/UserRepo';
import {
  IssueAuditEntryCreateBodySchema,
  IssueSchema,
} from '@src/schemas/IssueSchema';

const includeFields: Prisma.IssueAuditEntryInclude = {
  user: true,
};

interface IssueAuditEntryOptions {
  filter?: 'comment' | 'change' | null;
}

interface PropertyChange {
  oldValue: string;
  newValue: string;
}

function getStatusChangeValues(properties: PropertyChange): PropertyChange {
  const convertCasing = (s: string) => s.split('_').join(' ');
  return {
    oldValue: convertCasing(properties.oldValue),
    newValue: convertCasing(properties.newValue),
  };
}

function getGenericSanitizedPropertyChange(properties: PropertyChange) {
  // Property has already been converted to string, so these values may pop up.
  const sanitize = (s: string | null | undefined) =>
    s === 'null' || s === 'undefined' || !s ? '' : s;

  return {
    oldValue: sanitize(properties.oldValue),
    newValue: sanitize(properties.newValue),
  };
}

async function getSprintChangeValues(
  properties: PropertyChange
): Promise<PropertyChange> {
  const sanitize = async (s: string): Promise<string> => {
    if (s === 'null' || s === 'undefined' || s === '') {
      return s;
    }

    const sprint = await SprintRepo.getSprintById(s);

    if (!sprint) {
      return '';
    }

    return sprint.name;
  };

  const [oldValue, newValue] = await Promise.all([
    sanitize(properties.oldValue),
    sanitize(properties.newValue),
  ]);
  return {
    oldValue,
    newValue,
  };
}

async function getAssigneeChangeValues(
  properties: PropertyChange
): Promise<PropertyChange> {
  const sanitize = async (s: string): Promise<string> => {
    if (s === 'null' || s === 'undefined' || s === '') {
      return s;
    }

    const user = await UserRepo.getUserById(s);

    if (!user) {
      return '';
    }

    return user.name ?? s;
  };

  const [oldValue, newValue] = await Promise.all([
    sanitize(properties.oldValue),
    sanitize(properties.newValue),
  ]);
  return {
    oldValue,
    newValue,
  };
}

async function getPropertyChange(
  propertyName: string,
  properties: PropertyChange
): Promise<PropertyChange> {
  const supportedProperties = propertyName as keyof z.infer<typeof IssueSchema>;
  let sanitizedProperties = properties;
  switch (supportedProperties) {
    case 'issueStatus': {
      sanitizedProperties = getStatusChangeValues(properties);
      break;
    }
    case 'sprintId': {
      sanitizedProperties = await getSprintChangeValues(properties);
      break;
    }
    case 'assigneeId': {
      sanitizedProperties = await getAssigneeChangeValues(properties);
    }
  }

  return getGenericSanitizedPropertyChange(sanitizedProperties);
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
  async createSanitizedIssueAuditChangeEntry({
    user,
    issueId,
    propertyName,
    oldValue,
    newValue,
  }: {
    user: User;
    issueId: string;
    propertyName: string;
    oldValue: string;
    newValue: string;
  }) {
    await prisma.issueAuditEntry.create({
      data: {
        type: 'CHANGE',
        userId: user.id,
        issueId: issueId,
        ...(await getPropertyChange(propertyName, {
          oldValue,
          newValue,
        })),
      },
    });
  },
};

export default IssueAuditEntryRepo;
