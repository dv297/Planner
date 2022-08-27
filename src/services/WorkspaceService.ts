interface CreateWorkspaceInput {
  name: string;
  tag: string;
}

const WorkspaceService = {
  createWorkspace: async (data: CreateWorkspaceInput) => {
    const body = { name: data.name, tag: data.tag };
    await fetch('/api/workspace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  },
};

export default WorkspaceService;
