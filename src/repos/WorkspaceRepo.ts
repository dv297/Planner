import { User } from 'next-auth';

import prisma from '@src/lib/prisma';

const WorkspaceRepo = {
  async getWorkspaceByTag({
    user,
    teamId,
    workspaceTag,
  }: {
    user: User;
    teamId: string;
    workspaceTag: string;
  }) {
    const workspace = await prisma.workspace.findFirst({
      where: {
        AND: {
          tag: workspaceTag,
          TeamWorkspace: {
            some: {
              team: {
                id: teamId,
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

    return workspace;
  },
};

export default WorkspaceRepo;
