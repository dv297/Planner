import { Handle, Position } from 'reactflow';
import clsx from 'clsx';
import { z } from 'zod';

import UserAvatar from '@src/components/common/UserAvatar';
import IssueStatusPill from '@src/components/IssueStatusPill';
import { useProjectMapSelectedIssueContext } from '@src/components/ProjectMap/ProjectMapSelectedIssueContext';
import { IssueSchema } from '@src/schemas/IssueSchema';
import { convertToIssueStatusType } from '@src/types/IssueStatusType';

const handleStyle = {};

export type IssueNodeData = z.infer<typeof IssueSchema>;

interface IssueNodeProps {
  data: z.infer<typeof IssueSchema>;
  selected: boolean;
}

const IssueNode = (props: IssueNodeProps) => {
  const { data: issue, selected } = props;
  const selectedIssueContext = useProjectMapSelectedIssueContext();

  if (selected) {
    selectedIssueContext.setSelectedIssueId(issue.id);
  }

  return (
    <>
      <div
        className={clsx(
          'max-w-sm px-8 py-4 flex flex-col border border-solid border-gray-300 dark:border-gray-700 rounded-lg',
          'bg-white text-black dark:bg-slate-600 dark:text-gray-200',
          {
            'ring-4 ring-accent-blue-500': selected,
          }
        )}
      >
        <span className="text-lg font-bold">{issue.title}</span>
        {issue.mapNote && (
          <span className="mt-2 mb-2 block text-lg flex flex-row items-center break-normal">
            {issue.mapNote}
          </span>
        )}
        {issue.assignee && (
          <span
            className="mt-2 mb-2 block text-lg flex flex-row items-center"
            key={issue.assigneeId}
          >
            <div className="mr-4">
              <UserAvatar user={issue.assignee} />
            </div>
            Assigned to {issue.assignee.name}
          </span>
        )}
        {issue.sprint && (
          <span className="mt-2 mb-2 block text-lg flex flex-row items-center">
            {issue.sprint.name}
          </span>
        )}
        <div className="mt-2">
          <IssueStatusPill
            issueStatus={convertToIssueStatusType(issue.issueStatus)}
          />
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="input" />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={handleStyle}
      />
    </>
  );
};

export default IssueNode;
