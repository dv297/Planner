import { User } from '@prisma/client';

import prisma from '@src/lib/prisma';

export interface CreateTeamInput {
  name: string;
}

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
  async createTeamForUser(user: User, input: CreateTeamInput) {
    const team = await prisma.team.create({
      data: {
        name: input.name,
        TeamUsers: {
          create: {
            userId: user.id,
          },
        },
      },
    });

    return team;
  },
};

export default TeamsRepo;
