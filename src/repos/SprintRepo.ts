import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { z } from 'zod';

import prisma from '@src/lib/prisma';
import { ItemNotFound } from '@src/repos/RepoErrors';
import UserRepo from '@src/repos/UserRepo';
import { UpdateSingleSprintElementListSchema } from '@src/schemas/SprintSchema';

export interface CreateSprintInput {
  name: string;
  beginDate: string | null;
  endDate: string | null;
}

const SprintRepo = {
  async getSprintById(sprintId: string) {
    return prisma.sprint.findUnique({
      where: {
        id: sprintId,
      },
    });
  },
  async getSprints(user: User, workspaceTag: string, teamId: string) {
    const workspace = await UserRepo.getWorkspaceByTag(
      user,
      workspaceTag,
      teamId
    );

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
      orderBy: [
        {
          beginDate: {
            sort: 'asc',
            nulls: 'first',
          },
        },
        {
          name: 'asc',
        },
      ],
    });

    const activeSprint = await prisma.activeSprint.findUnique({
      where: {
        workspaceId: workspace.id,
      },
    });

    return {
      sprints,
      activeSprintId: activeSprint?.sprintId ?? null,
    };
  },
  async createSprint(
    user: User,
    workspaceTag: string,
    teamId: string,
    input: CreateSprintInput
  ) {
    const workspace = await UserRepo.getWorkspaceByTag(
      user,
      workspaceTag,
      teamId
    );

    if (!workspace) {
      return;
    }

    // First see if there are any other springs so that we know if we should mark this one as active upon creation
    const existingSprint = await prisma.sprint.findFirst({
      where: {
        workspaceId: workspace.id,
      },
    });

    const shouldMarkActive = !existingSprint;

    const activeSprintCreationData = shouldMarkActive
      ? {
          ActiveSprint: {
            create: {
              workspaceId: workspace.id,
            },
          },
        }
      : {};

    const sprint = await prisma.sprint.create({
      data: {
        workspaceId: workspace.id,
        ...input,
        ...activeSprintCreationData,
      },
    });

    return sprint;
  },
  async updateSprint(
    sprintId: string,
    data: z.infer<typeof UpdateSingleSprintElementListSchema>
  ) {
    try {
      const response = await prisma.sprint.update({
        where: {
          id: sprintId,
        },
        data: data.reduce((acc, entry) => {
          acc[entry.propertyName] = entry.data;
          return acc;
        }, {} as Record<string, any>),
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
  async deleteSprint(sprintId: string) {
    try {
      await prisma.activeSprint.deleteMany({
        where: {
          sprintId,
        },
      });

      const response = await prisma.sprint.delete({
        where: {
          id: sprintId,
        },
      });

      console.log(response);

      return response;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new ItemNotFound();
        }
      }
    }
  },
  async setActiveSprint(
    user: User,
    workspaceTag: string,
    teamId: string,
    sprintId: string
  ) {
    const workspace = await UserRepo.getWorkspaceByTag(
      user,
      workspaceTag,
      teamId
    );

    if (!workspace) {
      return;
    }

    const activeSprint = await prisma.activeSprint.upsert({
      where: {
        workspaceId: workspace.id,
      },
      create: {
        workspaceId: workspace.id,
        sprintId,
      },
      update: {
        sprintId,
      },
    });

    return activeSprint;
  },
};

export default SprintRepo;
