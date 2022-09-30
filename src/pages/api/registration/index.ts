import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import routeMatcher from '@src/utils/routeMatcher';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = {};
  return res.json(response);
};

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return routeMatcher(req, res, {
    POST: create,
  });
}

export default withAuthMiddleware(handle);
