import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import prisma from '@src/lib//prisma';
import { ItemNotFound } from '@src/repos/RepoErrors';
import UserRepo from '@src/repos/UserRepo';

export interface CreateSprintInput {
  name: string;
  beginDate: string | null;
  endDate: string | null;
}

const SprintRepo = {
  async getSprints(user: User, workspaceTag: string) {
    const workspace = await UserRepo.getWorkspaceByTag(user, workspaceTag);

    if (!workspace) {
      return;
    }

    const sprints = await prisma.sprint.findMany({
      where: {
        workspaceId: workspace.id,
      },
      include: {
        workspace: true,
      },
    });

    return sprints;
  },
  async createSprint(
    user: User,
    workspaceTag: string,
    input: CreateSprintInput
  ) {
    const workspace = await UserRepo.getWorkspaceByTag(user, workspaceTag);

    console.log(workspace);

    if (!workspace) {
      return;
    }

    const sprint = await prisma.sprint.create({
      data: {
        workspaceId: workspace.id,
        ...input,
      },
    });

    return sprint;
  },
  async deleteSprint(sprintId: string) {
    try {
      const response = await prisma.sprint.delete({
        where: {
          id: sprintId,
        },
      });

      return response;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new ItemNotFound();
        }
      }
    }
  },
};

export default SprintRepo;
