import { User } from '@prisma/client';

import prisma from '@src/lib//prisma';

const getIssueDataGenerator = ({
  workspaceId,
  projectId,
}: {
  workspaceId: string;
  projectId: string;
}) => {
  let count = 1;

  return async (title: string) => {
    count++;
    return await prisma.issue.create({
      data: {
        workspaceId,
        projectId,
        title,
        description:
          'This is a sample issue. In here, you can describe what needs to be done.',
        workspaceIssueCount: count,
      },
    });
  };
};

interface Issue {
  id: string;
}

const getPositionsJson = (issues: Issue[]) => {
  return {
    // TODO: See if this id is needed
    id: 'cl89bxej60667hv5xp2blptk6',
    data: {
      positions: [
        {
          issueId: issues[0].id,
          position: {
            x: 0,
            y: 100,
          },
        },
        {
          issueId: issues[1].id,
          position: {
            x: 413.2312314266849,
            y: 100.61661713782635,
          },
        },
        {
          issueId: issues[2].id,
          position: {
            x: 415.43306046265025,
            y: 441.8991878298392,
          },
        },
        {
          issueId: issues[3].id,
          position: {
            x: 733.8959327073071,
            y: 440.0460712899451,
          },
        },
        {
          issueId: issues[4].id,
          position: {
            x: 382.208666369326,
            y: -185.1989171064523,
          },
        },
        {
          issueId: issues[5].id,
          position: {
            x: 1333.4960615418495,
            y: -503.1035776073181,
          },
        },
        {
          issueId: issues[6].id,
          position: {
            x: 1337.4073887840177,
            y: -340.83971276708394,
          },
        },
        {
          issueId: issues[7].id,
          position: {
            x: 1334.679832916552,
            y: -191.04558160457026,
          },
        },
        {
          issueId: issues[8].id,
          position: {
            x: 854.0488447220823,
            y: 99.72016064155886,
          },
        },
        {
          issueId: issues[9].id,
          position: {
            x: 1349.8458457155434,
            y: 99.39139425804487,
          },
        },
        {
          issueId: issues[10].id,
          position: {
            x: 1353.0730714442927,
            y: 273.54154284456587,
          },
        },
        {
          issueId: issues[11].id,
          position: {
            x: 1793.5375371466303,
            y: 274.31031141788094,
          },
        },
      ],
    },
  };
};

const getEdge = (issue1: Issue, issue2: Issue) => {
  return {
    id: `reactflow__edge-${issue1.id}-${issue2.id}`,
    source: issue1.id,
    target: issue2.id,
  };
};

const getEdgesJson = (issues: Issue[]) => {
  const getEdgeData = (index1: number, index2: number) =>
    getEdge(issues[index1], issues[index2]);

  return {
    data: {
      edges: {
        id: 'cl89bxeiy0660hv5x3qan8zka',
        data: {
          edges: [
            getEdgeData(0, 1),
            getEdgeData(0, 2),
            getEdgeData(2, 3),
            getEdgeData(1, 4),
            getEdgeData(4, 5),
            getEdgeData(4, 6),
            getEdgeData(4, 7),
            getEdgeData(1, 8),
            getEdgeData(1, 9),
            getEdgeData(1, 10),
            getEdgeData(10, 11),
          ],
        },
        projectId: 'cl89bwwrk0083hv5xol0hm9uc',
      },
    },
  };
};

const InitialSetupRepo = {
  async performInitialTeamSetupForIndividualUser(user: User) {
    const teamResult = await prisma.team.create({
      data: {
        name: 'Team',
      },
    });

    await prisma.teamUsers.create({
      data: {
        team: {
          connect: {
            id: teamResult.id,
          },
        },
        user: {
          connect: {
            id: user.id,
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

    await prisma.teamWorkspace.create({
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

    await prisma.userPreference.update({
      where: {
        userId: user.id,
      },
      data: {
        hasFinishedSetup: true,
      },
    });

    return {
      workspaceResult,
    };
  },
  async performInitialSetupOfDemoProject({
    workspaceId,
  }: {
    workspaceId: string;
  }) {
    const projectResult = await prisma.project.create({
      data: {
        workspaceId,
        keyIssue: {
          create: {
            workspace: {
              connect: {
                id: workspaceId,
              },
            },
            title: 'My First Planner Project',
            description: `A sample project in order to introduce you to the features of Planner.

Here, you can provide a description of your project, just enough to help people get an idea of what you are trying to achieve. You can click on this description and most fields in the app to make modifications.

This also supports **Markdown**. When you edit the description field, you'll be given various controls to style the text in this field. You can also learn more about Markdown by going to this [link](https://www.markdownguide.org/). 

When you are finished editing the field, you can click outside of this field and we'll automatically close and save the edit box for you.`,
            workspaceIssueCount: 1,
          },
        },
      },
    });

    const projectId = projectResult.id;

    const getIssue = getIssueDataGenerator({
      projectId,
      workspaceId,
    });
    const issues = await Promise.all([
      getIssue('Setup Github repository'), // 0
      getIssue('Setup linting / formatting'), // 1
      getIssue('Configure Docker'), // 2
      getIssue('Setup E2E tests'), // 3
      getIssue('Research authentication libraries'), // 4
      getIssue('Create registration page'), // 5
      getIssue('Create sign in page'), // 6
      getIssue('Create sign out page'), // 7
      getIssue('Configure component library'), // 8
      getIssue('Create personal settings page'), // 9
      getIssue('Create team settings page'), // 10
      getIssue('Research email client'), // 11
    ]);

    const positionsData = getPositionsJson(issues);

    await prisma.projectMapPosition.create({
      data: {
        projectId,
        data: JSON.stringify({
          positions: positionsData.data.positions,
        }),
      },
    });

    await prisma.projectMapEdgesSet.create({
      data: {
        projectId,
        data: JSON.stringify({
          edges: getEdgesJson(issues).data.edges.data.edges,
        }),
      },
    });
  },
};

export default InitialSetupRepo;
