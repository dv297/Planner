import { z } from 'zod';

import { IssueSchema } from './IssueSchema';

export const GetSingleProjectMapPositionInputSchema = z.object({
  issueTag: z.array(z.string()),
});

export const ProjectMapPositionDataSchema = z.object({
  issueId: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
});

export const ProjectMapPositionDataParsedJsonSchema = z.object({
  positions: z.array(ProjectMapPositionDataSchema),
});

export const ProjectMapPositionDataListSchema = z.array(
  ProjectMapPositionDataSchema
);

export const UpdateSingleProjectMapPositionInputSchema = z.object({
  id: z.string(),
  data: z.object({
    positions: ProjectMapPositionDataListSchema,
  }),
});

export const ProjectMapPositionSchema = z.object({
  id: z.string(),
  data: ProjectMapPositionDataParsedJsonSchema,
  projectId: z.string(),
});

export const GetSingleProjectMapPositionResponseSchema = z.object({
  data: z.object({
    issues: z.array(IssueSchema),
    positions: ProjectMapPositionSchema,
  }),
});
