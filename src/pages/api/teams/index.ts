import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import { ItemNotFound } from '@src/repos/RepoErrors';
import TeamsRepo from '@src/repos/TeamsRepo';
import UserRepo from '@src/repos/UserRepo';
import {
  CreateTeamInputSchema,
  CreateTeamResponseSchema,
  GetTeamsResponseSchema,
} from '@src/schemas/TeamsSchema';
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

const createItem = async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await UserRepo.getCurrentUser({ req, res });
  const input = CreateTeamInputSchema.parse(req.body);

  if (!currentUser) {
    return;
  }

  const team = await TeamsRepo.createTeamForUser(currentUser, input);

  const response = CreateTeamResponseSchema.parse({
    data: team,
  });

  return res.json(response);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    GET: getItem,
    POST: createItem,
  });
}

export default withAuthMiddleware(handle);
