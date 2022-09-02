import prisma from '../lib/prisma';

const ProjectRepo = {
  getProjectsForWorkspace(workspaceId: string) {
    return prisma.project.findMany({
      where: {
        workspace: {
          TeamWorkspace: {
            some: {
              workspaceId: {
                equals: workspaceId,
              },
            },
          },
        },
      },
      include: {
        keyIssue: true,
      },
    });
  },
};

export default ProjectRepo;
