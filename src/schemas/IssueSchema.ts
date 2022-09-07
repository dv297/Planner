import { z } from 'zod';

import { WorkspaceSchema } from './WorkspaceSchemas';

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
