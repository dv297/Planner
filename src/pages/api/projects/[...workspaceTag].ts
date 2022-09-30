import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import ProjectRepo from '@src/repos/ProjectRepo';
import UserRepo from '@src/repos/UserRepo';
import {
  GetProjectsInputSchema,
  GetProjectsResponseSchema,
} from '@src/schemas/ProjectSchemas';
import routeMatcher from '@src/utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { workspaceTag } = GetProjectsInputSchema.parse(req.query);
  const tag = workspaceTag[0];

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const workspace = await UserRepo.getWorkspaceByTag(currentUser, tag);

  if (!workspace) {
    return res.status(404).send('Not Found');
  }

  const result = await ProjectRepo.getProjectsForWorkspace(workspace.id);

  const response = GetProjectsResponseSchema.parse({ data: result });
  return res.json(response);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    GET: get,
  });
}

export default withAuthMiddleware(handle);
