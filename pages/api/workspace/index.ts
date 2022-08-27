import prisma from '../../../src/lib/prisma';
import { withAuthMiddleware } from '../../../src/lib/withAuthMiddleware';
import { NextApiRequest, NextApiResponse } from 'next';

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { tag, name } = req.body;

  const result = await prisma.workspace.create({
    data: {
      tag,
      name,
    },
  });

  res.json(result);
}

export default withAuthMiddleware(handle);
