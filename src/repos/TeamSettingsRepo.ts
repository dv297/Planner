import { User } from '@prisma/client';

import prisma from '../lib/prisma';

const TeamSettingsRepo = {
  async getTeamUsers(user: User) {
    const teamUserForUser = await prisma.teamUsers.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!teamUserForUser) {
      return;
    }

    const teamUsers = await prisma.teamUsers.findMany({
      where: {
        teamId: teamUserForUser.teamId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
      },
    });

    return teamUsers;
  },
  async inviteTeammate(user: User, { email }: { email: string }) {
    const teamUserForUser = await prisma.teamUsers.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!teamUserForUser) {
      return null;
    }

    await prisma.teamInvite.create({
      data: {
        teamId: teamUserForUser.teamId,
        email,
      },
    });
  },
};

export default TeamSettingsRepo;
