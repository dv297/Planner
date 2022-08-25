import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import { withAuthMiddleware } from '../../../lib/withAuthMiddleware';

async function handle(req, res) {
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
