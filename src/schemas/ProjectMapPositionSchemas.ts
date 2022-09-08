import { z } from 'zod';

import { IssueSchema } from './IssueSchema';

export const GetSingleProjectMapPositionInputSchema = z.object({
  issueTag: z.array(z.string()),
});

export const ProjectMapPositionSchema = z.object({
  id: z.string(),
  data: z.string(),
  projectId: z.string(),
});

export const GetSingleProjectMapPositionDataSchema = z.object({
  issues: z.array(IssueSchema),
  positions: ProjectMapPositionSchema,
});

export const GetSingleProjectMapPositionResponseSchema = z.object({
  data: GetSingleProjectMapPositionDataSchema,
});
