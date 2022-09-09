import { z } from 'zod';

import prisma from '../lib/prisma';
import {
  ProjectMapEdgesSetSchema,
  UpdateSingleProjectMapEdgesSetInputSchema,
} from '../schemas/ProjectMapEdgesSetSchemas';

const ProjectMapEdgesSetRepo = {
  async getProjectMapEdgesSetForProject(projectId: string | undefined) {
    if (!projectId) {
      return null;
    }

    let edgesSet = await prisma.projectMapEdgesSet.findFirst({
      where: {
        projectId,
      },
    });

    // If we don't have a project map position, intialize one.

    if (!edgesSet) {
      edgesSet = await prisma.projectMapEdgesSet.create({
        data: {
          projectId,
          data: JSON.stringify({ edges: [] }),
        },
      });
    }

    const output = { ...edgesSet } as any;

    if (output?.data) {
      output.data = JSON.parse(output.data);
    }

    const parsedOutput = ProjectMapEdgesSetSchema.parse(output);

    return parsedOutput;
  },
  async updateProjectEdgesSetIssue(
    input: z.infer<typeof UpdateSingleProjectMapEdgesSetInputSchema>
  ) {
    const { id, data } = input;

    await prisma.projectMapEdgesSet.update({
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

export default ProjectMapEdgesSetRepo;
