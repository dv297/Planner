import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '../../../lib/withAuthMiddleware';
import IssueRepo from '../../../repos/IssueRepo';
import KeyIssueRepo from '../../../repos/KeyIssueRepo';
import UserRepo from '../../../repos/UserRepo';
import {
  GetSingleProjectInputSchema,
  GetSingleProjectResponseSchema,
  UpdateSingleProjectInputSchema,
} from '../../../schemas/ProjectSchemas';
import routeMatcher from '../../../utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { issueTag } = GetSingleProjectInputSchema.parse(req.query);
  const tag = issueTag[0];

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const keyIssueResponse = await KeyIssueRepo.getKeyIssueByTag(
    currentUser,
    tag
  );

  const issuesResponse = await IssueRepo.getIssuesForWorkspace(
    keyIssueResponse?.workspace?.id
  );

  if (!keyIssueResponse) {
    return res.status(404).send('Not Found');
  }

  const result = {
    keyIssue: keyIssueResponse?.keyIssue,
    issues: issuesResponse,
  };

  const response = GetSingleProjectResponseSchema.parse({ data: result });
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
