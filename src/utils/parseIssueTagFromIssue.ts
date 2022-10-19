interface ParseableIssue {
  workspace: {
    tag: string;
  };
  workspaceIssueCount: number;
}

export const parseIssueTagFromIssue = (issue: ParseableIssue) => {
  return `${issue.workspace.tag}-${issue.workspaceIssueCount}`;
};
