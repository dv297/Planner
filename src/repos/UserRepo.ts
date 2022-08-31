import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
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

      user = prisma.user.findUnique({
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

      user = prisma.user.findUnique({
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
      res.end(401);

      return null;
    }

    return user;
  },
};

export default UserRepo;
