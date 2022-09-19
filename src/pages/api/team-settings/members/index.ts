import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '../../../../lib/withAuthMiddleware';
import TeamSettingsRepo from '../../../../repos/TeamSettingsRepo';
import UserRepo from '../../../../repos/UserRepo';
import { TeamMembersResponseSchema } from '../../../../schemas/TeamSettingsSchema';
import routeMatcher from '../../../../utils/routeMatcher';

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
