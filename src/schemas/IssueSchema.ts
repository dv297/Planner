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

const dateSchema = z.preprocess((arg: any) => {
  if (typeof arg === 'string' || arg instanceof Date) {
    return new Date(arg);
  }
}, z.date());

export const IssueAuditEntryType = z
  .literal('comment')
  .or(z.literal('change'))
  .nullish();

export const IssueAuditEntrySchema = z.object({
  id: z.string(),
  oldValue: z.string(),
  newValue: z.string(),
  updatedAt: dateSchema,
  createdAt: dateSchema,
  type: z.string(),
  wasEdited: z.boolean(),
  issueId: z.string(),
  userId: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
  }),
});

export const IssueAuditEntryListSchema = z.array(IssueAuditEntrySchema);

export const GetIssueAuditEntriesResponseSchema = z.object({
  data: IssueAuditEntryListSchema,
});
