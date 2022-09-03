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
        keyIssue: {
          include: {
            workspace: true,
          },
        },
      },
    });
  },
};

export default ProjectRepo;
