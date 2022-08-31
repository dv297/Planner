import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';
import prisma from '../lib/prisma';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { Session } from 'next-auth';

const UserRepo = {
  getCurrentUser: async ({
    req,
    res,
  }: {
    req: NextApiRequest;
    res: NextApiResponse;
  }): Promise<User | null> => {
    let user;

    if (
      req.headers.nextauth_bypass === process.env.NEXTAUTH_BYPASS &&
      req.headers.override_email
    ) {
      const overrideHeader = req.headers.override_email;
      const email = Array.isArray(overrideHeader)
        ? overrideHeader[0]
        : overrideHeader;

      user = prisma.user.findUnique({
        where: {
          email,
        },
      });
    } else {
      const session = await unstable_getServerSession(req, res, authOptions);
      const castedSession = session as Session & { userId: string };

      user = prisma.user.findUnique({
        where: {
          id: castedSession.userId,
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
