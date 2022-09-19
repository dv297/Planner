import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '../../../../../lib/withAuthMiddleware';
import TeamSettingsRepo from '../../../../../repos/TeamSettingsRepo';
import UserRepo from '../../../../../repos/UserRepo';
import {
  InviteTeamMemberInputSchema,
  TeamMembersResponseSchema,
} from '../../../../../schemas/TeamSettingsSchema';
import routeMatcher from '../../../../../utils/routeMatcher';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const { email } = InviteTeamMemberInputSchema.parse(req.body);

  await TeamSettingsRepo.inviteTeammate(currentUser, {
    email,
  });

  const response = {
    data: {
      status: 'Success',
    },
  };

  return res.json(response);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    POST: create,
  });
}

export default withAuthMiddleware(handle);
