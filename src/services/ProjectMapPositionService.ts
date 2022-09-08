import { z } from 'zod';

import {
  GetSingleProjectMapPositionResponseSchema,
  ProjectMapPositionDataListSchema,
  UpdateSingleProjectMapPositionInputSchema,
} from '../schemas/ProjectMapPositionSchemas';

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
  updateProjectMapPosition: async (
    projectMapPositionId: string,
    positions: z.infer<typeof ProjectMapPositionDataListSchema>
  ) => {
    const body = UpdateSingleProjectMapPositionInputSchema.parse({
      id: projectMapPositionId,
      data: {
        positions,
      },
    });

    await fetch(`/api/project/map/TASK-1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  },
};

export default ProjectsService;
