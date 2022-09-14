import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '../../../lib/withAuthMiddleware';
import IssueRepo from '../../../repos/IssueRepo';
import UserRepo from '../../../repos/UserRepo';
import { IssueRelationSchemaResponse } from '../../../schemas/IssueRelationSchema';
import {
  GetSingleIssueInputSchema,
  UpdateSingleIssueInputSchema,
} from '../../../schemas/IssueSchema';
import routeMatcher from '../../../utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { issueTag } = GetSingleIssueInputSchema.parse(req.query);
  const tag = issueTag[0];

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const issueResponse = await IssueRepo.getIssuesForIssueRelations(
    currentUser,
    tag
  );

  if (!issueResponse) {
    return res.status(404).send('Not Found');
  }

  const response = IssueRelationSchemaResponse.parse({
    data: issueResponse,
  });

  return res.json(response);
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
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
