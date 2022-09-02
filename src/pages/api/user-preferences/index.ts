import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma';
import { withAuthMiddleware } from '../../../lib/withAuthMiddleware';
import UserRepo from '../../../repos/UserRepo';
import {
  GetUserPreferencesResponseSchema,
  UpdateUserPreferenceInputSchema,
  UpdateUserPreferenceResponseSchema,
} from '../../../schemas/UserPreferencesSchemas';
import routeMatcher from '../../../utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  let result = await prisma.userPreference.findFirst({
    where: {
      userId: currentUser.id,
    },
  });

  // Create initial user preference if one has not been created
  if (!result) {
    const teamUsers = await prisma.teamUsers.findMany({
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

    const workspaces = teamUsers.flatMap((entry) =>
      entry.team.TeamWorkspace.map((teamWorkspace) => teamWorkspace.workspace)
    );

    result = await prisma.userPreference.create({
      data: {
        userId: currentUser.id,
        workspaceId: workspaces[0]?.id,
        hasFinishedSetup: workspaces.length > 0,
      },
    });
  }

  const response = GetUserPreferencesResponseSchema.parse({ data: result });
  return res.json(response);
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  const input = UpdateUserPreferenceInputSchema.parse(req.body);
  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  const result = await prisma.userPreference.update({
    where: {
      userId: currentUser.id,
    },
    data: {
      workspaceId: input.workspaceId,
    },
  });

  const response = UpdateUserPreferenceResponseSchema.parse({ data: result });
  return res.json(response);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    GET: get,
    PUT: update,
  });
}

export default withAuthMiddleware(handle);
