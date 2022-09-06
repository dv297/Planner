import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '../../../lib/withAuthMiddleware';
import KeyIssueRepo from '../../../repos/KeyIssueRepo';
import UserRepo from '../../../repos/UserRepo';
import {
  GetSingleProjectInputSchema,
  GetSingleProjectResponseSchema,
} from '../../../schemas/ProjectSchemas';
import routeMatcher from '../../../utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { issueTag } = GetSingleProjectInputSchema.parse(req.query);
  const tag = issueTag[0];

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const result = await KeyIssueRepo.getKeyIssueByTag(currentUser, tag);

  const response = GetSingleProjectResponseSchema.parse({ data: result });
  return res.json(response);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    GET: get,
  });
}

export default withAuthMiddleware(handle);
