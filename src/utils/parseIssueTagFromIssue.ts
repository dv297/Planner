import { z } from 'zod';

import { KeyIssueSchema } from '../schemas/IssueSchema';

export const parseIssueTagFromIssue = (
  issue: z.infer<typeof KeyIssueSchema>
) => {
  return `${issue.workspace.tag}-${issue.workspaceIssueCount}`;
};
