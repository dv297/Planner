import { Handle, Position } from 'react-flow-renderer';

import { convertToIssueStatusType } from '../../types/IssueStatusType';
import IssueStatusPill from '../IssueStatusPill';

const handleStyle = {};

interface IssueWorkspaceData {
  id: string;
  name: string;
  tag: string;
}

export interface IssueNodeData {
  id: string;
  title: string;
  description: string;
  issueStatus: string;
  projectId: string;
  workspaceId: string;
  workspace: IssueWorkspaceData;
  workspaceIssueCount: number;
}

interface IssueNodeProps {
  data: IssueNodeData;
}

const IssueNode = (props: IssueNodeProps) => {
  const { data: issue } = props;

  return (
    <>
      <div className="px-8 py-4 flex flex-col border border-solid border-gray-300 rounded-lg bg-white">
        <span className="text-lg font-bold">{issue.title}</span>
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
