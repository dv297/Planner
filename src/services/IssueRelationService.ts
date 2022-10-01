import handleTeamSpecificFetch from '@src/lib/handleTeamSpecificFetch';
import { IssueRelationSchemaResponse } from '@src/schemas/IssueRelationSchema';

const IssueRelationService = {
  getIssueRelation: async (issueTag: string | undefined) => {
    if (!issueTag) {
      return;
    }

    const result = await handleTeamSpecificFetch(
      `/api/issue-relation/${issueTag}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = await result.json();

    const response = IssueRelationSchemaResponse.parse(data);

    return response.data;
  },
};

export default IssueRelationService;
