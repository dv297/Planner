import { Prisma } from '@prisma/client';
import { User } from 'next-auth';

import prisma from '@src/lib/prisma';
import IssueAuditEntryRepo from '@src/repos/IssueAuditEntryRepo';
import WorkspaceRepo from '@src/repos/WorkspaceRepo';
import { IssueRelationSchemaResponseData } from '@src/schemas/IssueRelationSchema';

export const issueFieldInclusion: Prisma.IssueInclude = {
  workspace: true,
  assignee: true,
  sprint: {
    include: {
      workspace: true,
    },
  },
  project: {
    include: {
      keyIssue: {
        select: {
          id: true,
          workspaceIssueCount: true,
          workspace: {
            select: {
              tag: true,
            },
          },
        },
      },
    },
  },
};

function getIssueById(issueId: string) {
  return prisma.issue.findUnique({
    where: {
      id: issueId,
    },
    include: issueFieldInclusion,
  });
}

const IssueRepo = {
  async getIssueByTag(user: User, issueTag: string, teamId: string) {
    const [workspaceTag, workspaceIssueCount] = issueTag.split('-');

    if (!workspaceTag || !workspaceIssueCount) {
      return null;
    }

    const workspace = await WorkspaceRepo.getWorkspaceByTag({
      user,
      teamId,
      workspaceTag,
    });

    if (!workspace) {
      return;
    }

    const issue = await prisma.issue.findFirst({
      where: {
        workspaceId: workspace.id,
        workspaceIssueCount: Number.parseInt(workspaceIssueCount),
      },
      include: issueFieldInclusion,
    });

    return {
      workspace,
      issue,
    };
  },
  async searchIssues(user: User, queryString: string) {
    const workspaces = await WorkspaceRepo.getWorkspacesForUser(user);

    return prisma.issue.findMany({
      where: {
        AND: {
          title: {
            contains: queryString,
            mode: 'insensitive',
          },
          workspaceId: {
            in: workspaces.map((teamWorkspace) => teamWorkspace.id),
          },
        },
      },
      select: {
        id: true,
        title: true,
        workspaceIssueCount: true,
        workspace: {
          select: {
            tag: true,
          },
        },
      },
      take: 5,
    });
  },
  async updateIssueByProperty(
    user: User,
    issueTag: string,
    propertyName: string,
    teamId: string,
    data: any
  ) {
    const issueResponse = await this.getIssueByTag(user, issueTag, teamId);

    if (!issueResponse || !issueResponse.issue) {
      return null;
    }

    const issue = await prisma.issue.update({
      where: {
        id: issueResponse.issue.id,
      },
      data: {
        [propertyName]: data,
      },
    });

    IssueAuditEntryRepo.createSanitizedIssueAuditChangeEntry({
      user,
      issueId: issue.id,
      propertyName,
      oldValue: `${
        issueResponse.issue[propertyName as keyof typeof issueResponse.issue]
      }`,
      newValue: `${issue[propertyName as keyof typeof issue]}`,
    }).catch((err) => {
      console.error(`Error creating issue audit entry for issue ${issue.id}`);
      console.error(err);
    });

    return issue;
  },
  async getIssuesForProject(projectId: string | undefined) {
    if (!projectId) {
      return [];
    }

    const issues = await prisma.issue.findMany({
      where: {
        projectId,
      },
      include: issueFieldInclusion,
      orderBy: {
        workspaceIssueCount: 'asc',
      },
    });

    return issues;
  },
  async getIssuesForSprint(sprintId: string) {
    const issues = await prisma.issue.findMany({
      where: {
        sprintId,
      },
      include: issueFieldInclusion,
    });

    return issues;
  },
  async getNewWorkspaceCount(workspaceId: string) {
    const keyIssueAggregate = await prisma.keyIssue.aggregate({
      where: {
        workspaceId: workspaceId,
      },
      _count: true,
    });

    const issueAggregate = await prisma.issue.aggregate({
      where: {
        workspaceId: workspaceId,
      },
      _count: true,
    });

    const newWorkspaceCount =
      keyIssueAggregate._count + issueAggregate._count + 1;

    return newWorkspaceCount;
  },
  async getIssuesForIssueRelations(
    user: User,
    issueTag: string,
    teamId: string
  ) {
    const issueResponse = await this.getIssueByTag(user, issueTag, teamId);

    if (!issueResponse) {
      return;
    }

    const { issue } = issueResponse;

    if (!issue) {
      return;
    }

    let issuesCausingThisIssueToBeBlockedIssueRelations =
      await prisma.issueRelation.findMany({
        where: {
          targetIssueId: issue.id,
          issueRelationType: 'DEPENDS_ON',
        },
      });

    let issuesBlockedByThisIssueIssueRelation =
      await prisma.issueRelation.findMany({
        where: {
          sourceIssueId: issue.id,
          issueRelationType: 'DEPENDS_ON',
        },
      });

    issuesCausingThisIssueToBeBlockedIssueRelations =
      issuesCausingThisIssueToBeBlockedIssueRelations ?? [];
    issuesBlockedByThisIssueIssueRelation =
      issuesBlockedByThisIssueIssueRelation ?? [];

    const issuesCausingThisIssueToBeBlocked = await Promise.all(
      issuesCausingThisIssueToBeBlockedIssueRelations.map((issue) =>
        getIssueById(issue.sourceIssueId)
      )
    );
    const issuesBlockedByThisIssue = await Promise.all(
      issuesBlockedByThisIssueIssueRelation.map((issue) =>
        getIssueById(issue.targetIssueId)
      )
    );

    const data = {
      BLOCKS: issuesBlockedByThisIssue,
      BLOCKED_BY: issuesCausingThisIssueToBeBlocked,
    };

    return IssueRelationSchemaResponseData.parse(data);
  },
  async getIssuesWithoutSprintsAssigned(
    user: User,
    workspaceId: string,
    meta: { skip: number; take: number } = { skip: 0, take: 10 }
  ) {
    const { skip, take } = meta;
    const issues = await prisma.issue.findMany({
      where: {
        workspaceId,
        sprintId: null,
      },
      include: issueFieldInclusion,
      orderBy: {
        workspaceIssueCount: 'asc',
      },
      skip,
      take,
    });

    return issues;
  },
};

export default IssueRepo;
