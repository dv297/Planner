import { GetSingleProjectMapPositionResponseSchema } from '../schemas/ProjectMapPositionSchemas';

const ProjectsService = {
  getProjectMapPosition: async (issueTag: string | undefined) => {
    if (!issueTag) {
      return;
    }

    const result = await fetch(`/api/project/map/${issueTag}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await result.json();

    const response = GetSingleProjectMapPositionResponseSchema.parse(data);

    return response.data;
  },
};

export default ProjectsService;
