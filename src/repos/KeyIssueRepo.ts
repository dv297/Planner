import { User } from 'next-auth';

import prisma from '../lib/prisma';

const KeyIssueRepo = {
  async getKeyIssueByTag(user: User, issueTag: string) {
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
      return null;
    }

    const workspaceId = workspace.id;

    const keyIssue = await prisma.keyIssue.findFirst({
      where: {
        workspaceId,
        workspaceIssueCount: Number.parseInt(workspaceIssueCount),
      },
      include: {
        workspace: true,
      },
    });

    return {
      workspace,
      keyIssue,
    };
  },
  async updateKeyIssueByProperty(
    user: User,
    issueTag: string,
    propertyName: string,
    data: any
  ) {
    const keyIssueResponse = await this.getKeyIssueByTag(user, issueTag);

    if (!keyIssueResponse || !keyIssueResponse.keyIssue) {
      return null;
    }

    const keyIssue = await prisma.keyIssue.update({
      where: {
        id: keyIssueResponse.keyIssue.id,
      },
      data: {
        [propertyName]: data,
      },
    });

    return keyIssue;
  },
};

export default KeyIssueRepo;
