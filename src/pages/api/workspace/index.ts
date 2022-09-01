import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma';
import { withAuthMiddleware } from '../../../lib/withAuthMiddleware';
import UserRepo from '../../../repos/UserRepo';
import {
  CreateWorkspaceSchema,
  GetWorkspacesResponseSchema,
} from '../../../schemas/WorkspaceSchemas';
import routeMatcher from '../../../utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
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
