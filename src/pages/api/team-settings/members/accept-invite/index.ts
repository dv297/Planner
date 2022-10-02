import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import TeamSettingsRepo from '@src/repos/TeamSettingsRepo';
import { AcceptTeamInviteInputSchema } from '@src/schemas/TeamSettingsSchema';
import routeMatcher from '@src/utils/routeMatcher';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const { inviteToken } = AcceptTeamInviteInputSchema.parse(req.body);

  const code = await TeamSettingsRepo.attemptToAcceptInviteToken(inviteToken);

  if (code === 0 || code === -1) {
    const response = {
      data: {
        status: 'Error',
      },
    };

    return res.status(500).json(response);
  }

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
