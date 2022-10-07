import { z } from 'zod';

import { IssueSchema } from '@src/schemas/IssueSchema';
import { parseIssueTagFromIssue } from '@src/utils/parseIssueTagFromIssue';

const getUrlForIssue = (issue: z.infer<typeof IssueSchema>) => {
  return `/app/issue/${parseIssueTagFromIssue(issue)}`;
};

export default getUrlForIssue;
