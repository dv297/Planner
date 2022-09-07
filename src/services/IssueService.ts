import { z } from 'zod';

import { CreateIssueInputSchema } from '../schemas/IssueSchema';

const IssueService = {
  createIssue: async (input: z.infer<typeof CreateIssueInputSchema>) => {
    CreateIssueInputSchema.parse(input);

    await fetch('/api/issue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
  },
};

export default IssueService;
