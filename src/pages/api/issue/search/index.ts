import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import IssueRepo from '@src/repos/IssueRepo';
import UserRepo from '@src/repos/UserRepo';
import {
  SearchIssueResponseSchema,
  SearchIssuesInputSchema,
} from '@src/schemas/IssueSchema';
import routeMatcher from '@src/utils/routeMatcher';

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const requestQuery = SearchIssuesInputSchema.parse(req.query);
  const query = requestQuery.query;

  if (!query) {
    return res.status(300).json({ message: 'Must provide "query" parameter' });
  }

  const result = await IssueRepo.searchIssues(currentUser, query);

  const response = SearchIssueResponseSchema.parse({ data: result });
  return res.json(response);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    GET: search,
  });
}

export default withAuthMiddleware(handle);
