import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma';
import { withAuthMiddleware } from '../../../lib/withAuthMiddleware';
import UserRepo from '../../../repos/UserRepo';
import {
  GetProjectsInputSchema,
  GetProjectsResponseSchema,
} from '../../../schemas/ProjectSchemas';
import routeMatcher from '../../../utils/routeMatcher';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { workspaceTag } = GetProjectsInputSchema.parse(req.query);
  const tag = workspaceTag[0];

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  // TODO: Protect route for user-specific info
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

  // TODO: See if database can do this filtering by tag
  const workspaceIds = teamUsers
    .flatMap((entry) =>
      entry.team.TeamWorkspace.map((teamWorkspace) => teamWorkspace.workspace)
    )
    .filter((entry) => entry.tag === tag)
    .map((entry) => entry.id);

  const result = await prisma.project.findMany({
    where: {
      workspace: {
        id: {
          in: workspaceIds,
        },
      },
    },
  });

  const response = GetProjectsResponseSchema.parse({ data: result });
  return res.json(response);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    GET: get,
  });
}

export default withAuthMiddleware(handle);
