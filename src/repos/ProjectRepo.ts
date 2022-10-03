import { User } from 'next-auth';

import prisma from '@src/lib/prisma';
import UserRepo from '@src/repos/UserRepo';

const ProjectRepo = {
  async getProjectByTag(currentUser: User, projectTag: string, teamId: string) {
    const [workspaceTag, workspaceIssueCount] = projectTag.split('-');

    if (!workspaceTag || !workspaceIssueCount) {
      return;
    }

    const workspace = await UserRepo.getWorkspaceByTag(
      currentUser,
      workspaceTag,
      teamId
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
          tag: {
            equals: workspaceTag,
          },
        },
      },
    });

    return project;
  },
  async getProjectByKeyIssueTag(
    currentUser: User,
    keyIssueTag: string,
    teamId: string
  ) {
    const [workspaceTag, workspaceIssueCount] = keyIssueTag.split('-');

    if (!workspaceTag || !workspaceIssueCount) {
      return;
    }

    const workspace = await UserRepo.getWorkspaceByTag(
      currentUser,
      workspaceTag,
      teamId
    );

    if (!workspace) {
      return;
    }

    const project = await prisma.project.findFirst({
      where: {
        workspaceId: workspace.id,
        keyIssue: {
          workspaceIssueCount: Number.parseInt(workspaceIssueCount),
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
