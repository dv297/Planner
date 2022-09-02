import { z } from 'zod';

import { KeyIssueSchema } from './IssueSchema';

export const GetSingleProjectInputSchema = z.object({
  issueTag: z.array(z.string()),
});

export const GetSingleProjectDataSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const GetSingleProjectResponseSchema = z.object({
  data: GetSingleProjectDataSchema,
});

export const GetProjectsInputSchema = z.object({
  workspaceTag: z.array(z.string()),
});

export const GetProjectsResponseDataSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  keyIssue: KeyIssueSchema,
});

export const GetProjectsResponseSchema = z.object({
  data: z.array(GetProjectsResponseDataSchema),
});