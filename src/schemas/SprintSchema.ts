import { z } from 'zod';

import { WorkspaceSchema } from '@src/schemas/WorkspaceSchemas';

const dateSchema = z.preprocess((arg: any) => {
  if (typeof arg === 'string' || arg instanceof Date) {
    return new Date(arg);
  }
}, z.date());

export const SprintSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  workspace: WorkspaceSchema,
  name: z.string(),
  beginDate: z.nullable(dateSchema),
  endDate: z.nullable(dateSchema),
});

export const SprintsListSchema = z.array(SprintSchema);

export const GetSprintsInputSchema = z.object({
  workspaceTag: z.array(z.string()),
});

export const GetSprintsResponseDataSchema = z.object({
  sprints: SprintsListSchema,
  activeSprintId: z.nullable(z.string()),
});

export const GetSprintsResponseSchema = z.object({
  data: GetSprintsResponseDataSchema,
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

export const GetSingleSprintInputSchema = z.object({
  sprintId: z.array(z.string()),
});

export const SetActiveSprintBodyInputSchema = z.object({
  sprintId: z.string(),
});

export const UpdateSingleSprintElementSchema = z.object({
  propertyName: z.string(),
  data: z.any(),
});

export const UpdateSingleSprintElementListSchema = z.array(
  UpdateSingleSprintElementSchema
);

export const UpdateSingleSprintBodyInputSchema = z.object({
  data: UpdateSingleSprintElementListSchema,
});
