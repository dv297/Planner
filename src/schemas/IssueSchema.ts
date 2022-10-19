import { z } from 'zod';

import { SprintSchema } from '@src/schemas/SprintSchema';
import { TeamMemberUserSchema } from '@src/schemas/TeamSettingsSchema';
import { WorkspaceSchema } from '@src/schemas/WorkspaceSchemas';

export const GetSingleIssueInputSchema = z.object({
  issueTag: z.array(z.string()),
});

export const UpdateSingleIssueInputSchema = z.object({
  propertyName: z.string(),
  data: z.any(),
});

const ProjectSchemaForIssue = z.object({
  id: z.string(),
  workspaceId: z.string(),
  keyIssue: z.object({
    id: z.string(),
    workspaceIssueCount: z.number(),
    workspace: z.object({
      tag: z.string(),
    }),
  }),
});

export const IssueSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  issueStatus: z.string(),
  projectId: z.string(),
  project: ProjectSchemaForIssue,
  workspaceId: z.string(),
  workspace: WorkspaceSchema,
  workspaceIssueCount: z.number(),
  assigneeId: z.nullable(z.string()),
  assignee: z.nullable(TeamMemberUserSchema),
  sprintId: z.nullable(z.string()),
  sprint: z.nullable(SprintSchema),
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

export const GetIssuesForSprintResponseDataSchema = z.object({
  issues: IssuesListSchema,
});

export const GetIssuesForSprintResponseSchema = z.object({
  data: GetIssuesForSprintResponseDataSchema,
});
