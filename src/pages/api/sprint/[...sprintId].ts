import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import { ItemNotFound } from '@src/repos/RepoErrors';
import SprintRepo from '@src/repos/SprintRepo';
import UserRepo from '@src/repos/UserRepo';
import { GetSingleSprintInputSchema } from '@src/schemas/SprintSchema';
import routeMatcher from '@src/utils/routeMatcher';

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
    DELETE: deleteItem,
  });
}

export default withAuthMiddleware(handle);
