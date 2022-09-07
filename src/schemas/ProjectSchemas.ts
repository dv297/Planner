import { z } from 'zod';

import { IssueSchema, KeyIssueSchema } from './IssueSchema';

export const CreateProjectInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  workspaceId: z.string(),
});

export const GetSingleProjectInputSchema = z.object({
  issueTag: z.array(z.string()),
});

export const UpdateSingleProjectInputSchema = z.object({
  propertyName: z.string(),
  data: z.any(),
});

export const GetSingleProjectDataSchema = z.object({
  keyIssue: KeyIssueSchema,
  issues: z.array(IssueSchema),
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
