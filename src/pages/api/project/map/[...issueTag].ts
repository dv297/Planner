import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '../../../../lib/withAuthMiddleware';
import IssueRepo from '../../../../repos/IssueRepo';
import KeyIssueRepo from '../../../../repos/KeyIssueRepo';
import ProjectMapRepo from '../../../../repos/ProjectMapRepo';
import ProjectRepo from '../../../../repos/ProjectRepo';
import UserRepo from '../../../../repos/UserRepo';
import {
  GetSingleProjectMapPositionInputSchema,
  GetSingleProjectMapPositionResponseSchema,
} from '../../../../schemas/ProjectMapPositionSchemas';
import {
  GetSingleProjectInputSchema,
  UpdateSingleProjectInputSchema,
} from '../../../../schemas/ProjectSchemas';
import routeMatcher from '../../../../utils/routeMatcher';

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
    return;
  }

  const issuesResponse = await IssueRepo.getIssuesForWorkspace(workspace.id);
  const project = await ProjectRepo.getProjectByTag(currentUser, tag);

  if (!project) {
    return;
  }

  const positionsResponse =
    await ProjectMapRepo.getProjectMapPositionsForProject(project.id);

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
  const { issueTag } = GetSingleProjectInputSchema.parse(req.query);
  const { propertyName, data } = UpdateSingleProjectInputSchema.parse(req.body);
  const tag = issueTag[0];

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const result = await KeyIssueRepo.updateKeyIssueByProperty(
    currentUser,
    tag,
    propertyName,
    data
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
