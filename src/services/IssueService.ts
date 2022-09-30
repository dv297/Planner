import { z } from 'zod';

import {
  CreateIssueInputSchema,
  GetSingleIssueResponseSchema,
} from '@src/schemas/IssueSchema';

const IssueService = {
  getIssue: async (issueTag: string | undefined) => {
    if (!issueTag) {
      return;
    }

    const result = await fetch(`/api/issue/${issueTag}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await result.json();

    const response = GetSingleIssueResponseSchema.parse(data);

    return response.data;
  },
  createIssue: async (input: z.infer<typeof CreateIssueInputSchema>) => {
    CreateIssueInputSchema.parse(input);

    await fetch('/api/issue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
  },
  updateIssue: async (
    issueTag: string | undefined,
    propertyName: string,
    data: any
  ) => {
    if (!issueTag) {
      return;
    }

    await fetch(`/api/issue/${issueTag}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertyName,
        data,
      }),
    });

    return null;
  },
};

export default IssueService;
