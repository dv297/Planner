import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { unstable_getServerSession } from 'next-auth/next';

import prisma from '@src/lib/prisma';
import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import { authOptions } from '@src/pages/api/auth/[...nextauth]';
import UserRepo from '@src/repos/UserRepo';
import routeMatcher from '@src/utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await UserRepo.getCurrentUser({ req, res });

  return res.json(currentUser);
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  const castedSession = session as Session & { userId: string };

  const { name, email, image } = req.body;

  const result = await prisma.user.update({
    where: {
      id: castedSession.userId,
    },
    data: {
      name,
      email,
      image,
    },
  });

  res.json(result);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    GET: get,
    POST: update,
  });
}

export default withAuthMiddleware(handle);
