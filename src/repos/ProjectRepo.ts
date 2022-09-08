import { User } from 'next-auth';

import prisma from '../lib/prisma';
import UserRepo from './UserRepo';

const ProjectRepo = {
  async getProjectByTag(currentUser: User, projectTag: string) {
    const [workspaceTag, workspaceIssueCount] = projectTag.split('-');

    if (!workspaceTag || !workspaceIssueCount) {
      return;
    }

    const workspace = await UserRepo.getWorkspaceByTag(
      currentUser,
      workspaceTag
    );

    if (!workspace) {
      return;
    }

    const project = await prisma.project.findFirst({
      where: {
        workspace: {
          id: {
            equals: workspace.id,
          },
        },
      },
    });

    return project;
  },
  getProjectsForWorkspace(workspaceId: string) {
    return prisma.project.findMany({
      where: {
        workspace: {
          TeamWorkspace: {
            some: {
              workspaceId: {
                equals: workspaceId,
              },
            },
          },
        },
      },
      include: {
        keyIssue: {
          include: {
            workspace: true,
          },
        },
      },
    });
  },
};

export default ProjectRepo;
