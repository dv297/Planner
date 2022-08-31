import prisma from '../../../src/lib/prisma';
import { withAuthMiddleware } from '../../../src/lib/withAuthMiddleware';
import { NextApiRequest, NextApiResponse } from 'next';
import UserRepo from '../../../src/repos/UserRepo';

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
  switch (req.method) {
    case 'GET': {
      return getWorkspacesForUser(req, res);
    }
    case 'POST': {
      return createWorkspace(req, res);
    }
  }
}

export default withAuthMiddleware(handle);
