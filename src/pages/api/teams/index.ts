import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import { ItemNotFound } from '@src/repos/RepoErrors';
import TeamsRepo from '@src/repos/TeamsRepo';
import UserRepo from '@src/repos/UserRepo';
import { GetTeamsResponseSchema } from '@src/schemas/TeamsSchema';
import routeMatcher from '@src/utils/routeMatcher';

const getItem = async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  try {
    const teams = await TeamsRepo.getTeamsForUser(currentUser);

    const response = GetTeamsResponseSchema.parse({
      data: teams,
    });

    return res.json(response);
  } catch (err) {
    if (err instanceof ItemNotFound) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
  }
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    GET: getItem,
  });
}

export default withAuthMiddleware(handle);
