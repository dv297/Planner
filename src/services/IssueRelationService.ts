import { IssueRelationSchemaResponse } from '../schemas/IssueRelationSchema';

const IssueRelationService = {
  getIssueRelation: async (issueTag: string | undefined) => {
    if (!issueTag) {
      return;
    }

    const result = await fetch(`/api/issue-relation/${issueTag}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await result.json();

    const response = IssueRelationSchemaResponse.parse(data);

    return response.data;
  },
};

export default IssueRelationService;
