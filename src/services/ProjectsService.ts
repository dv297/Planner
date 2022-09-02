import {
  GetProjectsResponseSchema,
  GetSingleProjectResponseSchema,
} from '../schemas/ProjectSchemas';

const ProjectsService = {
  getProject: async (issueTag: string | undefined) => {
    if (!issueTag) {
      return;
    }

    const result = await fetch(`/api/project/${issueTag}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await result.json();

    const response = GetSingleProjectResponseSchema.parse(data);

    return response.data;
  },
  getProjectsForWorkspace: async (workspaceTag: string | undefined) => {
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
