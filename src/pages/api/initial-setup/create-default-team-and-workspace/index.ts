import { NextApiRequest, NextApiResponse } from 'next';

import { withAuthMiddleware } from '@src/lib/withAuthMiddleware';
import InitialSetupRepo from '@src/repos/InitialSetupRepo';
import UserRepo from '@src/repos/UserRepo';

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return res.end(500);
  }

  const { workspaceResult } =
    await InitialSetupRepo.performInitialTeamSetupForIndividualUser(
      currentUser
    );

  await InitialSetupRepo.performInitialSetupOfDemoProject({
    workspaceId: workspaceResult.id,
  });

  return res.json({
    success: true,
  });
}

export default withAuthMiddleware(handle);
