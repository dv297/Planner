import { NextApiRequest, NextApiResponse } from 'next';
import { Session, User } from 'next-auth';
import { unstable_getServerSession } from 'next-auth/next';

import prisma from '../lib/prisma';
import { authOptions } from '../pages/api/auth/[...nextauth]';

const UserRepo = {
  getCurrentUser: async ({
    req,
    res,
  }: {
    req: NextApiRequest;
    res: NextApiResponse;
  }) => {
    let user;

    if (
      req?.headers?.nextauth_bypass === process.env.NEXTAUTH_BYPASS &&
      req?.headers?.override_email
    ) {
      const overrideHeader = req.headers.override_email;
      const email = Array.isArray(overrideHeader)
        ? overrideHeader[0]
        : overrideHeader;

      user = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          TeamUsers: {
            include: {
              team: true,
            },
          },
        },
      });
    } else {
      const session = await unstable_getServerSession(req, res, authOptions);
      const castedSession = session as Session & { userId: string };

      if (!castedSession.userId) {
        return res.status(404).send('Not Found');
      }

      user = await prisma.user.findUnique({
        where: {
          id: castedSession.userId,
        },
        include: {
          TeamUsers: {
            include: {
              team: true,
            },
          },
        },
      });
    }

    if (!user) {
      res.status(401).send('Unauthorized');

      return null;
    }

    return user;
  },

  async getWorkspaceByTag(user: User, workspaceTag: string) {
    const workspace = await prisma.workspace.findFirst({
      where: {
        AND: {
          tag: workspaceTag,
          TeamWorkspace: {
            some: {
              team: {
                TeamUsers: {
                  some: {
                    userId: {
                      equals: user.id,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return workspace;
  },
};

export default UserRepo;
