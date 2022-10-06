import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import prisma from '@src/lib/prisma';
import { ItemNotFound } from '@src/repos/RepoErrors';
import UserRepo from '@src/repos/UserRepo';

export interface CreateSprintInput {
  name: string;
  beginDate: string | null;
  endDate: string | null;
}

const SprintRepo = {
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
