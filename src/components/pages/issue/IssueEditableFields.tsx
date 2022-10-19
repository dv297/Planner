import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import IssueAssigneeSelector from '@src/components/pages/issue/IssueAssigneeSelector';
import IssueStatusSelector from '@src/components/pages/issue/IssueStatusSelector';
import SprintSelector from '@src/components/pages/issue/SprintSelector';
import { useProjectMapContext } from '@src/components/ProjectMap/ProjectMapContext';
import { IssueSchema } from '@src/schemas/IssueSchema';
import IssueService from '@src/services/IssueService';
import { convertToIssueStatusType } from '@src/types/IssueStatusType';

interface IssueEditableFieldsProps {
  tag: string;
  issue: z.infer<typeof IssueSchema>;
}

const IssueEditableFields = (props: IssueEditableFieldsProps) => {
  const { issue, tag } = props;

  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const projectMapContext = useProjectMapContext();

  const getUpdaterFunction =
    (tag: string | undefined, propertyName: string) =>
    async (textValue: string) => {
      try {
        await IssueService.updateIssue(tag, propertyName, textValue);
        queryClient.invalidateQueries();

        if (projectMapContext?.refresh) {
          projectMapContext.refresh();
        }
      } catch (err) {
        snackbar.displaySnackbar({
          message:
            'There was an error saving your change. Make a change and try again',
          severity: SnackbarSeverity.ERROR,
        });
      }
    };

  return (
    <div>
      <div>
        <IssueStatusSelector
          onChange={getUpdaterFunction(tag, 'issueStatus')}
          initialValue={convertToIssueStatusType(issue.issueStatus)}
        />
      </div>
      <div className="mt-8">
        <IssueAssigneeSelector
          issueTag={tag}
          initialAssignee={issue.assignee}
        />
      </div>
      <div className="mt-8">
        <SprintSelector
          issueTag={tag}
          initialValue={issue.sprint}
          key={issue.sprintId}
        />
      </div>
    </div>
  );
};

export default IssueEditableFields;
