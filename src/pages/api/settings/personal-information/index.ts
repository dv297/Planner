import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { unstable_getServerSession } from 'next-auth/next';

import prisma from '@src/lib/prisma';
import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import { authOptions } from '@src/pages/api/auth/[...nextauth]';
import UserRepo from '@src/repos/UserRepo';
import routeMatcher from '@src/utils/routeMatcher';

class SettingsService {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  async getPersonalInformation() {
    const { req, res } = this;

    const currentUser = await UserRepo.getCurrentUser({ req, res });

    return res.json(currentUser);
  }

  async updatePersonalInformation() {
    const { req, res } = this;
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
  }
}

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const service = new SettingsService(req, res);

  return routeMatcher(req, res, {
    // Don't mess with this; written like this to maintain "this" binding
    GET: () => {
      service.getPersonalInformation();
    },
    POST: () => {
      service.updatePersonalInformation();
    },
  });
}

export default withAuthMiddleware(handle);
