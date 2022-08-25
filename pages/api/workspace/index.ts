import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { tag, name } = req.body;

  // Verify that the user has a session
  const session = await getSession({ req });

  console.log(session);

  const result = await prisma.workspace.create({
    data: {
      tag,
      name,
    },
  });
  res.json(result);
}
