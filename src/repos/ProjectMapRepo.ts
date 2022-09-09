import { z } from 'zod';

import prisma from '../lib/prisma';
import {
  GetSingleProjectMapPositionResponseSchema,
  ProjectMapPositionSchema,
  UpdateSingleProjectMapPositionInputSchema,
} from '../schemas/ProjectMapPositionSchemas';
import { ProjectMapPositionDataEntry } from '../styles/ProjectMapPositionDataEntry';
import IssueRepo from './IssueRepo';

const ProjectMapRepo = {
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
  async updateProjectMapIssue(
    input: z.infer<typeof UpdateSingleProjectMapPositionInputSchema>
  ) {
    const { id, data } = input;

    await prisma.projectMapPosition.update({
      where: {
        id,
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

export default ProjectMapRepo;
