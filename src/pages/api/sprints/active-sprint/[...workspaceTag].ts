import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import SprintRepo from '@src/repos/SprintRepo';
import UserRepo from '@src/repos/UserRepo';
import {
  GetSprintsInputSchema,
  SetActiveSprintBodyInputSchema,
} from '@src/schemas/SprintSchema';
import extractSingle from '@src/utils/extractSingle';
import routeMatcher from '@src/utils/routeMatcher';

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  const teamId = extractSingle(req.headers['team-id']);

  if (!teamId) {
    return res.status(500).json({
      message: 'Header `team-id` not provided',
    });
  }

  const { workspaceTag } = GetSprintsInputSchema.parse(req.query);
  const tag = workspaceTag[0];

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const input = SetActiveSprintBodyInputSchema.parse(req.body);
  const { sprintId } = input;

  const sprintsResponse = await SprintRepo.setActiveSprint(
    currentUser,
    tag,
    teamId,
    sprintId
  );

  if (!sprintsResponse) {
    return res.status(404).send('Not Found');
  }

  return res.json({ status: 'success' });
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    PUT: update,
  });
}

export default withAuthMiddleware(handle);
