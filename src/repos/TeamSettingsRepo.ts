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

    const teamInvite = await prisma.teamInvite.create({
      data: {
        teamId: teamUserForUser.teamId,
        email,
      },
    });

    return teamInvite;
  },
  async getTeamInviteById(teamInviteId: string) {
    return prisma.teamInvite.findUniqueOrThrow({
      where: {
        id: teamInviteId,
      },
    });
  },
  async getTeamInviteByInviteToken(teamInviteToken: string) {
    return prisma.teamInvite.findUniqueOrThrow({
      where: {
        inviteToken: teamInviteToken,
      },
    });
  },
  /**
   * @return The number of invites accepted. Returns 0 if the invites were already accepted or if no equivalent invite
   *  was found.
   */
  async attemptToAcceptInviteToken(teamInviteToken: string): Promise<number> {
    if (!teamInviteToken) {
      return 0;
    }

    const existingInvite = await TeamSettingsRepo.getTeamInviteByInviteToken(
      teamInviteToken
    );

    // Already accepted, do not perform further processing
    if (existingInvite.isAccepted) {
      return 0;
    }

    const teamUser = await prisma.teamUsers.findFirst({
      where: {
        user: {
          email: existingInvite.email,
        },
      },
    });

    if (teamUser) {
      // Means the user already existed, probably part of another team
      // TODO: Handle this scenario
    } else {
      const user = await prisma.user.findFirst({
        where: {
          email: existingInvite.email,
        },
      });

      if (!user) {
        return -1;
      }

      await prisma.teamUsers.create({
        data: {
          userId: user.id,
          teamId: existingInvite.teamId,
        },
      });
    }

    const response = await prisma.teamInvite.updateMany({
      where: {
        inviteToken: teamInviteToken,
      },
      data: {
        isAccepted: true,
      },
    });

    return response.count;
  },
};

export default TeamSettingsRepo;
