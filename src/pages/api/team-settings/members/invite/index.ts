import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import { addToTeamInviteQueue } from '@src/queues/emailInviteQueue';
import TeamSettingsRepo from '@src/repos/TeamSettingsRepo';
import UserRepo from '@src/repos/UserRepo';
import { InviteTeamMemberInputSchema } from '@src/schemas/TeamSettingsSchema';
import routeMatcher from '@src/utils/routeMatcher';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const { email } = InviteTeamMemberInputSchema.parse(req.body);

  const teamInvite = await TeamSettingsRepo.inviteTeammate(currentUser, {
    email,
  });

  if (!teamInvite) {
    const response = {
      data: {
        status: 'Error',
      },
    };

    return res.status(500).json(response);
  }

  addToTeamInviteQueue(teamInvite.id);

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
