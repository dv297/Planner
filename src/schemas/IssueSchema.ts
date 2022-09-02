import { z } from 'zod';

export const KeyIssueSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  issueStatus: z.string(),
  projectId: z.string(),
  workspaceId: z.string(),
});
