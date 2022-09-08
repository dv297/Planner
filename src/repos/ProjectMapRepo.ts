import prisma from '../lib/prisma';
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

    return projectMapPosition;
  },
};

export default ProjectMapRepo;
