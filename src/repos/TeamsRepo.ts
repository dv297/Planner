import { User } from '@prisma/client';

import prisma from '@src/lib/prisma';

const TeamsRepo = {
  async getTeamsForUser(user: User) {
    const teamUsersForUser = await prisma.teamUsers.findMany({
      where: {
        userId: user.id,
      },
      include: {
        team: true,
      },
    });

    const teams = teamUsersForUser.map((teamUser) => teamUser.team);

    return teams;
  },
};

export default TeamsRepo;
