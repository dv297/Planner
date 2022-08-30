import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';
import prisma from '../lib/prisma';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { Session } from 'next-auth';

const UserService = {
  getCurrentUser: async ({
    req,
    res,
  }: {
    req: NextApiRequest;
    res: NextApiResponse;
  }): Promise<User | null> => {
    if (
      req.headers.nextauth_bypass === process.env.NEXTAUTH_BYPASS &&
      req.headers.override_email
    ) {
      const overrideHeader = req.headers.override_email;
      const email = Array.isArray(overrideHeader)
        ? overrideHeader[0]
        : overrideHeader;

      return prisma.user.findUnique({
        where: {
          email,
        },
      });
    }

    const session = await unstable_getServerSession(req, res, authOptions);
    const castedSession = session as Session & { userId: string };

    return prisma.user.findUnique({
      where: {
        id: castedSession.userId,
      },
    });
  },
};

export default UserService;
