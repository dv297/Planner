import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../lib/prisma';
import { withAuthMiddleware } from '../../../../lib/withAuthMiddleware';
import UserRepo from '../../../../repos/UserRepo';

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const currentUser = await UserRepo.getCurrentUser({ req, res });

  if (!currentUser) {
    return res.end(500);
  }

  const teamResult = await prisma.team.create({
    data: {
      name: 'Team',
    },
  });

  const connectTeamResult = await prisma.teamUsers.create({
    data: {
      team: {
        connect: {
          id: teamResult.id,
        },
      },
      user: {
        connect: {
          id: currentUser.id,
        },
      },
    },
  });

  const workspaceResult = await prisma.workspace.create({
    data: {
      tag: 'TASK',
      name: 'Task',
    },
  });

  const connectWorkspaceResult = await prisma.teamWorkspace.create({
    data: {
      team: {
        connect: {
          id: teamResult.id,
        },
      },
      workspace: {
        connect: {
          id: workspaceResult.id,
        },
      },
    },
  });

  const projectResult = await prisma.project.create({
    data: {
      workspaceId: workspaceResult.id,
      keyIssue: {
        create: {
          workspace: {
            connect: {
              id: workspaceResult.id,
            },
          },
          title: 'My First Project',
          description: `A sample project in order to introduce you to the features of Planner.

Here, you can provide a description of your project, just enough to help people get an idea of what you are trying to achieve. You can click on this description and most fields in the app to make modifications.

This also supports **Markdown**. When you edit the description field, you'll be given various controls to style the text in this field. You can also learn more about Markdown by going to this [link](https://www.markdownguide.org/). 

When you are finished editing the field, you can click outside of this field and we'll automatically close and save the edit box for you.`,
          workspaceIssueCount: 1,
        },
      },
    },
  });

  const issueResult = await prisma.issue.create({
    data: {
      workspaceId: workspaceResult.id,
      projectId: projectResult.id,
      title: 'Get Started',
      description:
        'This is a sample issue. In here, you can describe what needs to be done.',
      workspaceIssueCount: 2,
    },
  });

  return res.json({
    teamResult,
    connectTeamResult,
    workspaceResult,
    connectWorkspaceResult,
    projectResult,
    issueResult,
  });
}

export default withAuthMiddleware(handle);
