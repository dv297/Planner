import prisma from '../../../../src/lib/prisma';
import { withAuthMiddleware } from '../../../../src/lib/withAuthMiddleware';
import { NextApiRequest, NextApiResponse } from 'next';
import UserRepo from '../../../../src/repos/UserRepo';

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return res.end(500);
  }

  const teamResult = await prisma.team.create({
    data: {
      name: 'Team',
    },
  });

  const connectTeamResult = await prisma.teamUsers.create({
    data: {
      team: {
        connect: {
          id: teamResult.id,
        },
      },
      user: {
        connect: {
          id: currentUser.id,
        },
      },
    },
  });

  const workspaceResult = await prisma.workspace.create({
    data: {
      tag: 'TASK',
      name: 'Task',
    },
  });

  const connectWorkspaceResult = await prisma.teamWorkspace.create({
    data: {
      team: {
        connect: {
          id: teamResult.id,
        },
      },
      workspace: {
        connect: {
          id: workspaceResult.id,
        },
      },
    },
  });

  return res.json({
    teamResult,
    connectTeamResult,
    workspaceResult,
    connectWorkspaceResult,
  });
}

export default withAuthMiddleware(handle);
