import { z } from 'zod';

import {
  GetSingleProjectMapEdgesSetResponseSchema,
  ProjectMapEdgesSetListSchema,
  UpdateSingleProjectMapEdgesSetInputSchema,
} from '../schemas/ProjectMapEdgesSetSchemas';

const ProjectMapEdgesSetService = {
  getProjectMapEdgesSet: async (issueTag: string | undefined) => {
    if (!issueTag) {
      return;
    }

    const result = await fetch(`/api/project/map/edges-set/${issueTag}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await result.json();

    const response = GetSingleProjectMapEdgesSetResponseSchema.parse(data);

    return response.data;
  },
  updateProjectMapEdgesSet: async (
    projectMapEdgesSetId: string,
    edges: z.infer<typeof ProjectMapEdgesSetListSchema>
  ) => {
    const body = UpdateSingleProjectMapEdgesSetInputSchema.parse({
      id: projectMapEdgesSetId,
      data: {
        edges,
      },
    });

    await fetch(`/api/project/map/edges-set/TASK-1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  },
};

export default ProjectMapEdgesSetService;
