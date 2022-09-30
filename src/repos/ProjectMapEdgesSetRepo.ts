import { User } from '@prisma/client';
import { z } from 'zod';

import prisma from '@src/lib//prisma';
import {
  ProjectMapEdgesSetSchema,
  UpdateSingleProjectMapEdgesSetInputSchema,
} from '@src/schemas/ProjectMapEdgesSetSchemas';

const ProjectMapEdgesSetRepo = {
  async getProjectMapEdgesSet(user: User, edgesSetId: string) {
    return prisma.projectMapEdgesSet.findFirst({
      where: {
        id: edgesSetId,
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
    user: User,
    input: z.infer<typeof UpdateSingleProjectMapEdgesSetInputSchema>
  ) {
    const { id, data } = input;

    const projectMapEdgesSet = await this.getProjectMapEdgesSet(user, input.id);

    if (!projectMapEdgesSet) {
      return;
    }

    await prisma.projectMapEdgesSet.update({
      where: {
        id: projectMapEdgesSet.id,
      },
      data: {
        data: JSON.stringify(data),
      },
    });

    return {
      id,
      projectId: projectMapEdgesSet.projectId,
    };
  },
};

export default ProjectMapEdgesSetRepo;
