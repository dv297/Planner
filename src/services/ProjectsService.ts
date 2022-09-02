import { GetProjectsResponseSchema } from '../schemas/ProjectSchemas';

const ProjectsService = {
  get: async (workspaceTag: string | undefined) => {
    if (!workspaceTag) {
      return;
    }

    const result = await fetch(`/api/projects/${workspaceTag}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await result.json();

    const response = GetProjectsResponseSchema.parse(data);

    return response.data;
  },
};

export default ProjectsService;
