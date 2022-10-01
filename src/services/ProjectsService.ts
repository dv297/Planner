import handleTeamSpecificFetch from '@src/lib/handleTeamSpecificFetch';
import {
  GetProjectsResponseSchema,
  GetSingleProjectResponseSchema,
} from '@src/schemas/ProjectSchemas';

const ProjectsService = {
  getProject: async (issueTag: string | undefined) => {
    if (!issueTag) {
      return;
    }

    const result = await handleTeamSpecificFetch(`/api/project/${issueTag}`, {
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

    await handleTeamSpecificFetch(`/api/project/${issueTag}`, {
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

    const result = await handleTeamSpecificFetch(
      `/api/projects/${workspaceTag}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!result.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await result.json();

    const response = GetProjectsResponseSchema.parse(data);

    return response.data;
  },
};

export default ProjectsService;
