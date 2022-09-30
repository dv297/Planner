import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import IssueRepo from '@src/repos/IssueRepo';
import { ItemNotFound } from '@src/repos/RepoErrors';
import SprintRepo from '@src/repos/SprintRepo';
import UserRepo from '@src/repos/UserRepo';
import { GetIssuesForSprintResponseSchema } from '@src/schemas/IssueSchema';
import { GetSingleSprintInputSchema } from '@src/schemas/SprintSchema';
import routeMatcher from '@src/utils/routeMatcher';

const getItem = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sprintId: sprintIdArray } = GetSingleSprintInputSchema.parse(
    req.query
  );
  const sprintId = sprintIdArray[0];

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  try {
    const issues = await IssueRepo.getIssuesForSprint(sprintId);

    const response = GetIssuesForSprintResponseSchema.parse({
      data: {
        issues,
      },
    });

    return res.json(response);
  } catch (err) {
    if (err instanceof ItemNotFound) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
  }
};

const deleteItem = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sprintId: sprintIdArray } = GetSingleSprintInputSchema.parse(
    req.query
  );
  const sprintId = sprintIdArray[0];

  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return;
  }

  try {
    const deletedItem = await SprintRepo.deleteSprint(sprintId);

    const response = {
      data: {
        id: deletedItem?.id,
      },
    };

    return res.json(response);
  } catch (err) {
    if (err instanceof ItemNotFound) {
      res.status(404).json({
        message: 'Not found',
      });
    }
  }
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    GET: getItem,
    DELETE: deleteItem,
  });
}

export default withAuthMiddleware(handle);
