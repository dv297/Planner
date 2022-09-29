import { User } from '@prisma/client';

import prisma from '../lib/prisma';
import UserRepo from './UserRepo';

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
    console.log(workspaceTag);
    const workspace = await UserRepo.getWorkspaceByTag(user, workspaceTag);

    console.log(workspace);

    if (!workspace) {
      return;
    }

    console.log({ input });
    const sprint = await prisma.sprint.create({
      data: {
        workspaceId: workspace.id,
        ...input,
      },
    });

    return sprint;
  },
};

export default SprintRepo;
