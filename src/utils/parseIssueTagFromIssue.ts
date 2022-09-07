import { z } from 'zod';

import { IssueSchema, KeyIssueSchema } from '../schemas/IssueSchema';

export const parseIssueTagFromIssue = (
  issue: z.infer<typeof KeyIssueSchema | typeof IssueSchema>
) => {
  return `${issue.workspace.tag}-${issue.workspaceIssueCount}`;
};
