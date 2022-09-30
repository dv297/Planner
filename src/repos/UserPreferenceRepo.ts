import prisma from '@src/lib/prisma';

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
        hasFinishedSetup: workspaces.length > 0,
      },
    });

    return result;
  },
};

export default UserPreferenceRepo;
