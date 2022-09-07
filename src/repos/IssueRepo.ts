import prisma from '../lib/prisma';

const IssueRepo = {
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
};

export default IssueRepo;
