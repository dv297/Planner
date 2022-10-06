import { z } from 'zod';

import handleTeamSpecificFetch from '@src/lib/handleTeamSpecificFetch';
import { CreateSprintInput } from '@src/repos/SprintRepo';
import { GetIssuesForSprintResponseSchema } from '@src/schemas/IssueSchema';
import {
  GetSprintsResponseSchema,
  UpdateSingleSprintElementListSchema,
} from '@src/schemas/SprintSchema';

const SprintsService = {
  getSprintsForWorkspace: async (workspaceTag: string | undefined) => {
    if (!workspaceTag) {
      return;
    }

    const result = await handleTeamSpecificFetch(
      `/api/sprints/${workspaceTag}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!result.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await result.json();

    const response = GetSprintsResponseSchema.parse(data);

    return response.data;
  },
  getIssuesForSprint: async (sprintId: string | undefined) => {
    if (!sprintId) {
      return;
    }

    const result = await handleTeamSpecificFetch(`/api/sprint/${sprintId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!result.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await result.json();

    const response = GetIssuesForSprintResponseSchema.parse(data);

    return response.data;
  },
  async getIssuesInBacklog(workspaceTag: string) {
    const result = await handleTeamSpecificFetch(
      `/api/sprint/backlog/${workspaceTag}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!result.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await result.json();

    const response = GetIssuesForSprintResponseSchema.parse(data);

    return response.data;
  },
  createSprint: async (
    workspaceTag: string | undefined,
    input: CreateSprintInput
  ) => {
    if (!workspaceTag) {
      return;
    }

    const result = await handleTeamSpecificFetch(
      `/api/sprints/${workspaceTag}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      }
    );

    if (!result.ok) {
      throw new Error('Network response was not ok');
    }
  },
  updateSprint: async (
    sprintId: string | undefined,
    data: z.infer<typeof UpdateSingleSprintElementListSchema>
  ) => {
    if (!sprintId) {
      return;
    }

    UpdateSingleSprintElementListSchema.parse(data);

    const result = await handleTeamSpecificFetch(`/api/sprint/${sprintId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });

    if (!result.ok) {
      throw new Error('Network response was not ok');
    }
  },
  deleteSprint: async (sprintId: string | undefined) => {
    if (!sprintId) {
      return;
    }

    const result = await handleTeamSpecificFetch(`/api/sprint/${sprintId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!result.ok) {
      throw new Error('Network response was not ok');
    }
  },
  setActiveSprint: async (
    workspaceTag: string | undefined,
    sprintId: string
  ) => {
    if (!workspaceTag) {
      return;
    }

    const result = await handleTeamSpecificFetch(
      `/api/sprints/active-sprint/${workspaceTag}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sprintId }),
      }
    );

    if (!result.ok) {
      throw new Error('Network response was not ok');
    }
  },
};

export default SprintsService;
