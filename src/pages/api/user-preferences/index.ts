import { User, UserPreference } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma';
import { withAuthMiddleware } from '../../../lib/withAuthMiddleware';
import UserPreferenceRepo from '../../../repos/UserPreferenceRepo';
import UserRepo from '../../../repos/UserRepo';
import {
  GetUserPreferencesResponseSchema,
  UpdateUserPreferenceInputSchema,
  UpdateUserPreferenceResponseSchema,
} from '../../../schemas/UserPreferencesSchemas';
import routeMatcher from '../../../utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  let currentUser: User | null;
  try {
    currentUser = await UserRepo.getCurrentUser({ req, res });
  } catch (err) {
    return res.redirect('/app/login');
  }

  if (!currentUser) {
    return res.redirect('/app/login');
  }

  let result: UserPreference | null =
    await UserPreferenceRepo.getUserPreference(currentUser.id);

  // Create initial user preference if one has not been created
  if (!result) {
    result = await UserPreferenceRepo.createDefaultUserPreference(
      currentUser.id
    );
  }

  const response = GetUserPreferencesResponseSchema.parse({ data: result });
  return res.json(response);
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  const input = UpdateUserPreferenceInputSchema.parse(req.body);
  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const result = await prisma.userPreference.update({
    where: {
      userId: currentUser.id,
    },
    data: {
      workspaceId: input.workspaceId,
    },
  });

  const response = UpdateUserPreferenceResponseSchema.parse({ data: result });
  return res.json(response);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    GET: get,
    PUT: update,
  });
}

export default withAuthMiddleware(handle);
