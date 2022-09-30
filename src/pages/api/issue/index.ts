import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@src/lib/prisma';
import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import IssueRepo from '@src/repos/IssueRepo';
import UserRepo from '@src/repos/UserRepo';
import { CreateIssueInputSchema } from '@src/schemas/IssueSchema';
import routeMatcher from '@src/utils/routeMatcher';

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
