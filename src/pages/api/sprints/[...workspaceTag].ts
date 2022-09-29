import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '../../../lib/withAuthMiddleware';
import SprintRepo from '../../../repos/SprintRepo';
import UserRepo from '../../../repos/UserRepo';
import {
  CreateSprintBodyInputSchema,
  CreateSprintResponseSchema,
  CreateSprintUrlInputSchema,
  GetSprintsInputSchema,
  GetSprintsResponseSchema,
} from '../../../schemas/SprintSchema';
import routeMatcher from '../../../utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { workspaceTag } = GetSprintsInputSchema.parse(req.query);
  const tag = workspaceTag[0];

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const sprints = await SprintRepo.getSprints(currentUser, tag);

  if (!sprints) {
    return res.status(404).send('Not Found');
  }

  const response = GetSprintsResponseSchema.parse({ data: sprints });
  return res.json(response);
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const { workspaceTag } = CreateSprintUrlInputSchema.parse(req.query);
  const input = CreateSprintBodyInputSchema.parse(req.body);
  const tag = workspaceTag[0];

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const sprint = await SprintRepo.createSprint(currentUser, tag, input);

  const response = CreateSprintResponseSchema.parse({
    id: sprint?.id,
  });

  return res.json(response);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    GET: get,
    POST: create,
  });
}

export default withAuthMiddleware(handle);
