import { User } from '@prisma/client';
import { z } from 'zod';

import prisma from '@src/lib/prisma';
import IssueRepo from '@src/repos/IssueRepo';
import {
  ProjectMapPositionSchema,
  UpdateSingleProjectMapPositionInputSchema,
} from '@src/schemas/ProjectMapPositionSchemas';
import { ProjectMapPositionDataEntry } from '@src/styles/ProjectMapPositionDataEntry';

const ProjectMapPositionsRepo = {
  async getProjectMapPosition(user: User, projectMapPositionId: string) {
    return prisma.projectMapPosition.findFirst({
      where: {
        id: projectMapPositionId,
        project: {
          workspace: {
            TeamWorkspace: {
              some: {
                team: {
                  TeamUsers: {
                    some: {
                      userId: user.id,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  },
  async getProjectMapPositionsForProject(projectId: string | undefined) {
    if (!projectId) {
      return null;
    }

    let projectMapPosition = await prisma.projectMapPosition.findFirst({
      where: {
        projectId,
      },
    });

    // If we don't have a project map position, intialize one.
    if (!projectMapPosition) {
      const issues = await IssueRepo.getIssuesForProject(projectId);

      const defaultPositions: ProjectMapPositionDataEntry[] = issues.map(
        (issue, index) => {
          return {
            issueId: issue.id,
            position: {
              x: index * 400,
              y: 100,
            },
          };
        }
      );

      projectMapPosition = await prisma.projectMapPosition.create({
        data: {
          projectId,
          data: JSON.stringify({
            positions: defaultPositions,
          }),
        },
      });
    }

    const output = { ...projectMapPosition } as any;

    if (output?.data) {
      output.data = JSON.parse(output.data);
    }

    const parsedOutput = ProjectMapPositionSchema.parse(output);

    return parsedOutput;
  },
  async updateProjectMapPositions(
    user: User,
    input: z.infer<typeof UpdateSingleProjectMapPositionInputSchema>
  ) {
    const { id, data } = input;

    const projectMapPosition = await this.getProjectMapPosition(user, input.id);

    if (!projectMapPosition) {
      return;
    }

    await prisma.projectMapPosition.update({
      where: {
        id: projectMapPosition.id,
      },
      data: {
        data: JSON.stringify(data),
      },
    });

    return {
      id,
    };
  },
};

export default ProjectMapPositionsRepo;
