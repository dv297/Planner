import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '../../../../../lib/withAuthMiddleware';
import ProjectMapRepo from '../../../../../repos/ProjectMapRepo';
import ProjectRepo from '../../../../../repos/ProjectRepo';
import UserRepo from '../../../../../repos/UserRepo';
import {
  GetSingleProjectMapEdgeInputSchema,
  GetSingleProjectMapEdgesSetResponseSchema,
  UpdateSingleProjectMapEdgesSetInputSchema,
} from '../../../../../schemas/ProjectMapEdgesSetSchemas';
import routeMatcher from '../../../../../utils/routeMatcher';

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
    return;
  }

  const project = await ProjectRepo.getProjectByTag(currentUser, tag);

  if (!project) {
    return;
  }

  const edgesResponse = await ProjectMapRepo.getProjectMapEdgesSetForProject(
    project.id
  );

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

  const result = await ProjectMapRepo.updateProjectEdgesSetIssue(input);

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