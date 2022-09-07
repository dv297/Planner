import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma';
import { withAuthMiddleware } from '../../../lib/withAuthMiddleware';
import IssueRepo from '../../../repos/IssueRepo';
import UserRepo from '../../../repos/UserRepo';
import { CreateIssueInputSchema } from '../../../schemas/IssueSchema';
import routeMatcher from '../../../utils/routeMatcher';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const input = CreateIssueInputSchema.parse(req.body);
  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const newWorkspaceCount = await IssueRepo.getNewWorkspaceCount(
    input.workspaceId
  );

  const result = await prisma.issue.create({
    data: {
      workspaceId: input.workspaceId,
      projectId: input.projectId,
      title: input.title,
      description: input.description,
      workspaceIssueCount: newWorkspaceCount,
    },
  });

  const response = { data: result };
  return res.json(response);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    POST: create,
  });
}

export default withAuthMiddleware(handle);
