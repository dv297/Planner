import { User } from '@prisma/client';
import { z } from 'zod';

import prisma from '@src/lib/prisma';
import { UpdateUserPreferenceInputSchema } from '@src/schemas/UserPreferencesSchemas';

const UserPreferenceRepo = {
  async getUserPreference(userId: string) {
    const userPreference = await prisma.userPreference.findFirst({
      where: {
        userId,
      },
    });

    return userPreference;
  },
  async createDefaultUserPreference(userId: string) {
    const teamUsers = await prisma.teamUsers.findMany({
      where: {
        userId,
      },
      select: {
        team: {
          select: {
            id: true,
            TeamWorkspace: {
              include: {
                workspace: true,
              },
            },
          },
        },
      },
    });

    const workspaces = teamUsers.flatMap((entry) =>
      entry.team.TeamWorkspace.map((teamWorkspace) => teamWorkspace.workspace)
    );

    const result = await prisma.userPreference.create({
      data: {
        userId,
        workspaceId: workspaces[0]?.id,
        teamId: teamUsers[0].team.id,
        hasFinishedSetup: workspaces.length > 0,
      },
    });

    return result;
  },
  async updateUserPreference(
    user: User,
    updates: z.infer<typeof UpdateUserPreferenceInputSchema>
  ) {
    const updateObject = updates.reduce((acc, entry) => {
      acc[entry.field] = entry.value;
      return acc;
    }, {} as Record<string, string>);

    const result = await prisma.userPreference.update({
      where: {
        userId: user.id,
      },
      data: updateObject,
    });

    return result;
  },
};

export default UserPreferenceRepo;
