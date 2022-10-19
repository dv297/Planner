import { z } from 'zod';

import IssueAssigneeSelector from '@src/components/pages/issue/IssueAssigneeSelector';
import IssueStatusSelector from '@src/components/pages/issue/IssueStatusSelector';
import SprintSelector from '@src/components/pages/issue/SprintSelector';
import useIssueUpdaterFunction from '@src/hooks/useIssueUpdaterFunction';
import { IssueSchema } from '@src/schemas/IssueSchema';
import { convertToIssueStatusType } from '@src/types/IssueStatusType';

interface IssueEditableFieldsProps {
  tag: string;
  issue: z.infer<typeof IssueSchema>;
}

const IssueEditableFields = (props: IssueEditableFieldsProps) => {
  const { issue, tag } = props;

  const updateIssueStatus = useIssueUpdaterFunction({
    tag,
    propertyName: 'issueStatus',
  });

  return (
    <div>
      <div>
        <IssueStatusSelector
          onChange={updateIssueStatus}
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
