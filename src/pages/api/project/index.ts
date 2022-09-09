import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma';
import { withAuthMiddleware } from '../../../lib/withAuthMiddleware';
import IssueRepo from '../../../repos/IssueRepo';
import UserRepo from '../../../repos/UserRepo';
import { CreateProjectInputSchema } from '../../../schemas/ProjectSchemas';
import routeMatcher from '../../../utils/routeMatcher';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const input = CreateProjectInputSchema.parse(req.body);

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  // Double check that the user is associated to the workspace
  try {
    await prisma.teamWorkspace.findFirstOrThrow({
      where: {
        workspaceId: input.workspaceId,
        team: {
          TeamUsers: {
            some: {
              userId: currentUser.id,
            },
          },
        },
      },
    });
  } catch (err) {
    return res.status(404).send('Not Found');
  }

  const newWorkspaceCount = await IssueRepo.getNewWorkspaceCount(
    input.workspaceId
  );

  const result = await prisma.project.create({
    data: {
      workspaceId: input.workspaceId,
      keyIssue: {
        create: {
          workspaceId: input.workspaceId,
          title: input.title,
          description: input.description,
          workspaceIssueCount: newWorkspaceCount,
        },
      },
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
