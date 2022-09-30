enum QueryKeys {
  WORKSPACES = 'workspaces',
  USER_PREFERENCES = 'user-preferences',
  PROJECTS = 'projects',
  PROJECT = 'project',
  ISSUE = 'issue',
  ISSUE_RELATION = 'issue-relation',
  EDGE_SET = 'edget-set',
  PERSONAL_INFORMATION = 'personal-information',
  SPRINTS = 'sprints',
  TEAMS = 'teams',
}

export const getDynamicQueryKey = (queryKey: QueryKeys, id: string) => {
  return `${queryKey}-${id}`;
};

export default QueryKeys;
