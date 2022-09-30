import { Handle, Position } from 'react-flow-renderer';
import { z } from 'zod';

import UserAvatar from '@src/components/common/UserAvatar';
import IssueStatusPill from '@src/components/IssueStatusPill';
import { IssueSchema } from '@src/schemas/IssueSchema';
import { convertToIssueStatusType } from '@src/types/IssueStatusType';

const handleStyle = {};

export type IssueNodeData = z.infer<typeof IssueSchema>;

interface IssueNodeProps {
  data: z.infer<typeof IssueSchema>;
}

const IssueNode = (props: IssueNodeProps) => {
  const { data: issue } = props;

  return (
    <>
      <div className="px-8 py-4 flex flex-col border border-solid border-gray-300 rounded-lg bg-white">
        <span className="text-lg font-bold">{issue.title}</span>
        {issue.assignee && (
          <span className="mt-2 mb-2 block text-lg flex flex-row items-center">
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
