import handleTeamSpecificFetch from '@src/lib/handleTeamSpecificFetch';
import { GetWorkspacesResponseSchema } from '@src/schemas/WorkspaceSchemas';

interface CreateWorkspaceInput {
  name: string;
  tag: string;
}

const WorkspaceService = {
  getWorkspaces: async () => {
    const result = await handleTeamSpecificFetch('/api/workspace', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!result.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await result.json();

    const workspaces = GetWorkspacesResponseSchema.parse(data);

    return workspaces.data;
  },
  createWorkspace: async (data: CreateWorkspaceInput) => {
    const body = { name: data.name, tag: data.tag };
    const result = await handleTeamSpecificFetch('/api/workspace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!result.ok) {
      throw new Error('Network response was not ok');
    }

    const response = await result.json();

    return response.workspaceResult.id as string;
  },
};

export default WorkspaceService;
