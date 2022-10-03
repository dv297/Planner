import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import IssueRepo from '@src/repos/IssueRepo';
import KeyIssueRepo from '@src/repos/KeyIssueRepo';
import UserRepo from '@src/repos/UserRepo';
import {
  GetSingleProjectInputSchema,
  GetSingleProjectResponseSchema,
  UpdateSingleProjectInputSchema,
} from '@src/schemas/ProjectSchemas';
import routeMatcher from '@src/utils/routeMatcher';

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

  if (!keyIssueResponse) {
    return res.status(404).send('Not Found');
  }

  const issuesResponse = await IssueRepo.getIssuesForProject(
    keyIssueResponse?.keyIssue?.project.id
  );

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
