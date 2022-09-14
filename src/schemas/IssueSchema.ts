import { z } from 'zod';

import { WorkspaceSchema } from './WorkspaceSchemas';

export const GetSingleIssueInputSchema = z.object({
  issueTag: z.array(z.string()),
});

export const UpdateSingleIssueInputSchema = z.object({
  propertyName: z.string(),
  data: z.any(),
});

export const IssueSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  issueStatus: z.string(),
  projectId: z.string(),
  workspaceId: z.string(),
  workspace: WorkspaceSchema,
  workspaceIssueCount: z.number(),
});

export const IssueSchemaWithoutWorkspace = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  issueStatus: z.string(),
  projectId: z.string(),
  workspaceId: z.string(),
  workspaceIssueCount: z.number(),
});

export const GetSingleIssueResponseSchema = z.object({
  data: IssueSchema,
});

export const IssuesListSchema = z.array(IssueSchema);

export const KeyIssueSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  issueStatus: z.string(),
  projectId: z.string(),
  workspaceId: z.string(),
  workspace: WorkspaceSchema,
  workspaceIssueCount: z.number(),
});

export const CreateIssueInputSchema = z.object({
  workspaceId: z.string(),
  projectId: z.string(),
  title: z.string(),
  description: z.string(),
});
