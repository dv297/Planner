import { z } from 'zod';

import { WorkspaceSchema } from './WorkspaceSchemas';

export const SprintSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  workspace: WorkspaceSchema,
  name: z.string(),
  beginDate: z.nullable(z.date()),
  endDate: z.nullable(z.date()),
});

export const SprintsListSchema = z.array(SprintSchema);

export const GetSprintsInputSchema = z.object({
  workspaceTag: z.array(z.string()),
});

export const GetSprintsResponseSchema = z.object({
  data: SprintsListSchema,
});

export const CreateSprintUrlInputSchema = z.object({
  workspaceTag: z.array(z.string()),
});

export const CreateSprintBodyInputSchema = z.object({
  name: z.string(),
  beginDate: z.nullable(z.string()),
  endDate: z.nullable(z.string()),
});

export const CreateSprintResponseSchema = z.object({
  id: z.string(),
});
