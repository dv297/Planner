import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../lib/prisma';
import { withAuthMiddleware } from '../../../../lib/withAuthMiddleware';
import UserRepo from '../../../../repos/UserRepo';

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

  const projectResult = await prisma.project.create({
    data: {
      workspaceId: workspaceResult.id,
      title: 'Initial Project',
      description:
        'Sample project to demonstrate how a project might be structured',
    },
  });

  const issueResult = await prisma.issue.create({
    data: {
      workspaceId: workspaceResult.id,
      projectId: projectResult.id,
      title: 'Get Started',
      description:
        'This is a sample issue. In here, you can describe what needs to be done.',
    },
  });

  return res.json({
    teamResult,
    connectTeamResult,
    workspaceResult,
    connectWorkspaceResult,
    projectResult,
    issueResult,
  });
}

export default withAuthMiddleware(handle);
