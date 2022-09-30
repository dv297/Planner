import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import { addProjectToProcessingQueue } from '@src/queues/mapProcessingQueue';
import ProjectMapEdgesSetRepo from '@src/repos/ProjectMapEdgesSetRepo';
import ProjectRepo from '@src/repos/ProjectRepo';
import UserRepo from '@src/repos/UserRepo';
import {
  GetSingleProjectMapEdgeInputSchema,
  GetSingleProjectMapEdgesSetResponseSchema,
  UpdateSingleProjectMapEdgesSetInputSchema,
} from '@src/schemas/ProjectMapEdgesSetSchemas';
import routeMatcher from '@src/utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { issueTag } = GetSingleProjectMapEdgeInputSchema.parse(req.query);
  const tag = issueTag[0];

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const workspaceTag = tag.split('-')[0];
  const workspace = await UserRepo.getWorkspaceByTag(currentUser, workspaceTag);

  if (!workspace) {
    return res.status(404).send('Not Found');
  }

  const project = await ProjectRepo.getProjectByTag(currentUser, tag);

  if (!project) {
    return res.status(404).send('Not Found');
  }

  const edgesResponse =
    await ProjectMapEdgesSetRepo.getProjectMapEdgesSetForProject(project.id);

  const result = {
    edges: edgesResponse,
  };

  const response = GetSingleProjectMapEdgesSetResponseSchema.parse({
    data: result,
  });
  return res.json(response);
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  const input = UpdateSingleProjectMapEdgesSetInputSchema.parse(req.body);

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const result = await ProjectMapEdgesSetRepo.updateProjectEdgesSetIssue(
    currentUser,
    input
  );

  addProjectToProcessingQueue(result?.projectId ?? '');

  if (!result) {
    return res.status(404).send('Not Found');
  }

  const response = { data: result };

  return res.json(response);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    GET: get,
    PUT: update,
  });
}

export default withAuthMiddleware(handle);
