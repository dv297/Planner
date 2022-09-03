import { z } from 'zod';

import { WorkspaceSchema } from './WorkspaceSchemas';

export const KeyIssueSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  issueStatus: z.string(),
  projectId: z.string(),
  workspaceId: z.string(),
  workspace: WorkspaceSchema,
});
