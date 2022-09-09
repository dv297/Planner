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
  updateProject: async (
    issueTag: string | undefined,
    propertyName: string,
    data: any
  ) => {
    if (!issueTag) {
      return;
    }

    await fetch(`/api/project/${issueTag}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertyName,
        data,
      }),
    });

    return null;
  },
  getProjectsForWorkspace: async (workspaceTag: string | undefined) => {
    if (!workspaceTag) {
      return;
    }

    const result = await fetch(`/api/projects/${workspaceTag}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!result.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await result.json();

    const response = GetProjectsResponseSchema.parse(data);

    return response.data;
  },
};

export default ProjectsService;
