import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import IssueRepo from '@src/repos/IssueRepo';
import UserRepo from '@src/repos/UserRepo';
import WorkspaceRepo from '@src/repos/WorkspaceRepo';
import { GetIssuesForSprintResponseSchema } from '@src/schemas/IssueSchema';
import { GetSprintsInputSchema } from '@src/schemas/SprintSchema';
import extractSingle from '@src/utils/extractSingle';
import routeMatcher from '@src/utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const teamId = extractSingle(req.headers['team-id']);
  let take = 10;
  let skip = 0;

  if (req.headers['take']) {
    const headerValue = extractSingle(req.headers['take']);
    if (headerValue) {
      take = Number.parseInt(headerValue);
    }
  }

  if (req.headers['skip']) {
    const headerValue = extractSingle(req.headers['skip']);
    if (headerValue) {
      skip = Number.parseInt(headerValue);
    }
  }

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

  const workspace = await WorkspaceRepo.getWorkspaceByTag({
    user: currentUser,
    workspaceTag: tag,
    teamId,
  });

  if (!workspace) {
    return res.status(404).json({
      message: 'Workspace not found',
    });
  }

  const issues = await IssueRepo.getIssuesWithoutSprintsAssigned(
    currentUser,
    workspace.id,
    {
      take,
      skip,
    }
  );

  if (!issues) {
    return res.status(404).send('Not Found');
  }

  const response = GetIssuesForSprintResponseSchema.parse({
    data: {
      issues,
    },
  });

  return res.json(response);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    GET: get,
  });
}

export default withAuthMiddleware(handle);
