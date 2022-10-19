import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import IssueRepo from '@src/repos/IssueRepo';
import UserRepo from '@src/repos/UserRepo';
import {
  GetSingleIssueInputSchema,
  GetSingleIssueResponseSchema,
  UpdateSingleIssueInputSchema,
} from '@src/schemas/IssueSchema';
import extractSingle from '@src/utils/extractSingle';
import routeMatcher from '@src/utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const teamId = extractSingle(req.headers['team-id']);

  if (!teamId) {
    return res.status(500).json({
      message: 'Header `team-id` not provided',
    });
  }
  const { issueTag } = GetSingleIssueInputSchema.parse(req.query);
  const tag = issueTag[0];

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const issueResponse = await IssueRepo.getIssueByTag(currentUser, tag, teamId);

  if (!issueResponse) {
    return res.status(404).send('Not Found');
  }

  const response = GetSingleIssueResponseSchema.parse({
    data: issueResponse?.issue,
  });

  return res.json(response);
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  const teamId = extractSingle(req.headers['team-id']);

  if (!teamId) {
    return res.status(500).json({
      message: 'Header `team-id` not provided',
    });
  }

  const { issueTag } = GetSingleIssueInputSchema.parse(req.query);
  const { propertyName, data } = UpdateSingleIssueInputSchema.parse(req.body);
  const tag = issueTag[0];

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const result = await IssueRepo.updateIssueByProperty(
    currentUser,
    tag,
    propertyName,
    teamId,
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
