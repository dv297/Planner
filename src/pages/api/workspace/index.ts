import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma';
import { withAuthMiddleware } from '../../../lib/withAuthMiddleware';
import UserRepo from '../../../repos/UserRepo';
import routeMatcher from '../../../utils/routeMatcher';

const getWorkspacesForUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const teamUser = await prisma.teamUsers.findFirst({
    where: {
      userId: currentUser.id,
    },
    select: {
      team: {
        select: {
          TeamWorkspace: {
            include: {
              workspace: true,
            },
          },
        },
      },
    },
  });

  const workspaces = teamUser?.team?.TeamWorkspace.map(
    (teams) => teams.workspace
  );

  return res.json({
    workspaces: workspaces ?? [],
  });
};

const createWorkspace = async (req: NextApiRequest, res: NextApiResponse) => {
  const { tag, name } = req.body;

  const result = await prisma.workspace.create({
    data: {
      tag,
      name,
    },
  });

  res.json(result);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    GET: getWorkspacesForUser,
    POST: createWorkspace,
  });
}

export default withAuthMiddleware(handle);
