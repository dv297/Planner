import prisma from '../../../src/lib/prisma';
import { withAuthMiddleware } from '../../../src/lib/withAuthMiddleware';

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
