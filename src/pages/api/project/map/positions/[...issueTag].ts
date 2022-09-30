import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import IssueRepo from '@src/repos/IssueRepo';
import ProjectMapPositionsRepo from '@src/repos/ProjectMapPositionsRepo';
import ProjectRepo from '@src/repos/ProjectRepo';
import UserRepo from '@src/repos/UserRepo';
import {
  GetSingleProjectMapPositionInputSchema,
  GetSingleProjectMapPositionResponseSchema,
  UpdateSingleProjectMapPositionInputSchema,
} from '@src/schemas/ProjectMapPositionSchemas';
import routeMatcher from '@src/utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { issueTag } = GetSingleProjectMapPositionInputSchema.parse(req.query);
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

  const issuesResponse = await IssueRepo.getIssuesForWorkspace(workspace.id);
  const project = await ProjectRepo.getProjectByTag(currentUser, tag);

  if (!project) {
    return;
  }

  const positionsResponse =
    await ProjectMapPositionsRepo.getProjectMapPositionsForProject(project.id);

  const result = {
    issues: issuesResponse,
    positions: positionsResponse,
  };

  const response = GetSingleProjectMapPositionResponseSchema.parse({
    data: result,
  });
  return res.json(response);
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  const input = UpdateSingleProjectMapPositionInputSchema.parse(req.body);

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const result = await ProjectMapPositionsRepo.updateProjectMapPositions(
    currentUser,
    input
  );

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
