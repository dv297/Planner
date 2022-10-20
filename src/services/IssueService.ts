import { z } from 'zod';

import handleTeamSpecificFetch from '@src/lib/handleTeamSpecificFetch';
import {
  CreateIssueInputSchema,
  GetIssueAuditEntriesResponseSchema,
  GetSingleIssueResponseSchema,
} from '@src/schemas/IssueSchema';

const IssueService = {
  getIssue: async (issueTag: string | undefined) => {
    if (!issueTag) {
      return;
    }

    const result = await handleTeamSpecificFetch(`/api/issue/${issueTag}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await result.json();

    const response = GetSingleIssueResponseSchema.parse(data);

    return response.data;
  },
  createIssue: async (input: z.infer<typeof CreateIssueInputSchema>) => {
    CreateIssueInputSchema.parse(input);

    await handleTeamSpecificFetch('/api/issue', {
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

    await handleTeamSpecificFetch(`/api/issue/${issueTag}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertyName,
        data,
      }),
    });

    return null;
  },
  getIssueAuditEntries: async (
    issueTag: string | undefined,
    options?: { filter: 'comment' | 'change' | undefined }
  ) => {
    if (!issueTag) {
      return;
    }

    const result = await handleTeamSpecificFetch(
      `/api/issue/audit/${issueTag}${
        options?.filter ? `?filter=${options.filter}` : ''
      }`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = await result.json();

    const response = GetIssueAuditEntriesResponseSchema.parse(data);

    return response.data;
  },
};

export default IssueService;
