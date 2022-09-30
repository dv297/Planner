import { User } from 'next-auth';

import prisma from '@src/lib//prisma';
import { IssueRelationSchemaResponseData } from '@src/schemas/IssueRelationSchema';

function getIssueById(issueId: string) {
  return prisma.issue.findUnique({
    where: {
      id: issueId,
    },
    include: {
      workspace: true,
      assignee: true,
      sprint: {
        include: {
          workspace: true,
        },
      },
    },
  });
}

const IssueRepo = {
  async getIssueByTag(user: User, issueTag: string) {
    const [workspaceTag, workspaceIssueCount] = issueTag.split('-');

    if (!workspaceTag || !workspaceIssueCount) {
      return null;
    }

    const workspace = await prisma.workspace.findFirst({
      where: {
        AND: {
          tag: workspaceTag,
          TeamWorkspace: {
            some: {
              team: {
                TeamUsers: {
                  some: {
                    userId: {
                      equals: user.id,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!workspace) {
      return;
    }

    const issue = await prisma.issue.findFirst({
      where: {
        workspaceId: workspace.id,
        workspaceIssueCount: Number.parseInt(workspaceIssueCount),
      },
      include: {
        workspace: true,
        assignee: true,
        sprint: {
          include: {
            workspace: true,
          },
        },
      },
    });

    return {
      workspace,
      issue,
    };
  },
  async updateIssueByProperty(
    user: User,
    issueTag: string,
    propertyName: string,
    data: any
  ) {
    const issueResponse = await this.getIssueByTag(user, issueTag);

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
      include: {
        workspace: true,
        assignee: true,
        sprint: {
          include: {
            workspace: true,
          },
        },
      },
      orderBy: {
        workspaceIssueCount: 'asc',
      },
    });

    return issues;
  },
  async getIssuesForWorkspace(workspaceId: string | undefined) {
    if (!workspaceId) {
      return [];
    }

    const issues = await prisma.issue.findMany({
      where: {
        workspaceId,
      },
      include: {
        workspace: true,
        assignee: true,
        sprint: {
          include: {
            workspace: true,
          },
        },
      },
      orderBy: {
        workspaceIssueCount: 'asc',
      },
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
  async getIssuesForIssueRelations(user: User, issueTag: string) {
    const issueResponse = await this.getIssueByTag(user, issueTag);

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
};

export default IssueRepo;
