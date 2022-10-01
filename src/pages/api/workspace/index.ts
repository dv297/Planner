import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@src/lib/prisma';
import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import UserRepo from '@src/repos/UserRepo';
import {
  CreateWorkspaceSchema,
  GetWorkspacesResponseSchema,
} from '@src/schemas/WorkspaceSchemas';
import extractSingle from '@src/utils/extractSingle';
import routeMatcher from '@src/utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const teamId = extractSingle(req.headers['team-id']);

  if (!teamId) {
    return res.status(500).json({
      message: 'Header `team-id` not provided',
    });
  }

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const teamUser = await prisma.teamUsers.findFirst({
    where: {
      userId: currentUser.id,
      teamId: teamId,
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

  const result = GetWorkspacesResponseSchema.parse({
    data: workspaces ?? [],
  });

  return res.json(result);
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const createWorkspaceInput = CreateWorkspaceSchema.parse(req.body);
  const { tag, name } = createWorkspaceInput;

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const workspaceResult = await prisma.workspace.create({
    data: {
      tag,
      name,
    },
  });

  const connectWorkspaceResult = await prisma.teamWorkspace.create({
    data: {
      workspace: {
        connect: {
          id: workspaceResult.id,
        },
      },
      team: {
        connect: {
          id: currentUser.TeamUsers[0].team.id,
        },
      },
    },
  });

  res.json({
    workspaceResult,
    connectWorkspaceResult,
  });
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    GET: get,
    POST: create,
  });
}

export default withAuthMiddleware(handle);
