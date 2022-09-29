import { CreateSprintInput } from '../repos/SprintRepo';
import { GetSprintsResponseSchema } from '../schemas/SprintSchema';

const SprintsService = {
  getSprintsForWorkspace: async (workspaceTag: string | undefined) => {
    if (!workspaceTag) {
      return;
    }

    const result = await fetch(`/api/sprints/${workspaceTag}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!result.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await result.json();

    const response = GetSprintsResponseSchema.parse(data);

    return response.data;
  },
  createSprint: async (
    workspaceTag: string | undefined,
    input: CreateSprintInput
  ) => {
    if (!workspaceTag) {
      return;
    }

    const result = await fetch(`/api/sprints/${workspaceTag}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!result.ok) {
      throw new Error('Network response was not ok');
    }
  },
};

export default SprintsService;
