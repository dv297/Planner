import { z } from 'zod';

import { IssueSchema } from './IssueSchema';

export const IssueRelationSchemaResponseData = z.object({
  BLOCKED_BY: z.array(IssueSchema),
  BLOCKS: z.array(IssueSchema),
});

export const IssueRelationSchemaResponse = z.object({
  data: IssueRelationSchemaResponseData,
});
