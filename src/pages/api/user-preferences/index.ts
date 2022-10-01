import { UserPreference } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import UserPreferenceRepo from '@src/repos/UserPreferenceRepo';
import UserRepo from '@src/repos/UserRepo';
import {
  GetUserPreferencesResponseSchema,
  UpdateUserPreferenceInputSchema,
  UpdateUserPreferenceResponseSchema,
} from '@src/schemas/UserPreferencesSchemas';
import routeMatcher from '@src/utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await UserRepo.getCurrentUser({ req, res });

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

  const response = GetUserPreferencesResponseSchema.parse({
    data: {
      ...result,
      teamId: result.teamId ?? null,
    },
  });
  return res.json(response);
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  const input = UpdateUserPreferenceInputSchema.parse(req.body);
  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const result = await UserPreferenceRepo.updateUserPreference(
    currentUser,
    input
  );

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
