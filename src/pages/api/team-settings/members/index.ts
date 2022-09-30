import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import TeamSettingsRepo from '@src/repos/TeamSettingsRepo';
import UserRepo from '@src/repos/UserRepo';
import { TeamMembersResponseSchema } from '@src/schemas/TeamSettingsSchema';
import routeMatcher from '@src/utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const members = await TeamSettingsRepo.getTeamUsers(currentUser);

  const response = TeamMembersResponseSchema.parse({
    data: {
      members,
    },
  });

  return res.json(response);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    // Don't mess with this; written like this to maintain "this" binding
    GET: get,
  });
}

export default withAuthMiddleware(handle);
