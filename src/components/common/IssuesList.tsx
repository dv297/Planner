import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { z } from 'zod';

import Button from '@src/components/common/Button';
import UserAvatar from '@src/components/common/UserAvatar';
import IssueCreationModal from '@src/components/IssueCreationModal';
import IssueStatusPill from '@src/components/IssueStatusPill';
import { IssuesListSchema } from '@src/schemas/IssueSchema';
import { convertToIssueStatusType } from '@src/types/IssueStatusType';
import { parseIssueTagFromIssue } from '@src/utils/parseIssueTagFromIssue';

interface IssuesListProps {
  projectId?: string;
  issues: z.infer<typeof IssuesListSchema>;
  allowIssueCreation?: boolean;
}

const IssuesList = (props: IssuesListProps) => {
  const { projectId, issues, allowIssueCreation = false } = props;
  const [isIssueCreationModalOpen, setIsIssueCreationModalOpen] =
    useState(false);

  return (
    <>
      {allowIssueCreation && projectId && (
        <IssueCreationModal
          isOpen={isIssueCreationModalOpen}
          setIsOpen={setIsIssueCreationModalOpen}
          projectId={projectId}
        />
      )}
      <div className="w-full rounded-md text-left border-solid border-gray-300 border">
        <div className="divide-y divide-gray-300">
          <div className="flex flex-row items-center bg-gray-50 divide-gray-200 px-4 py-2 grid-cols-12 grid">
            <span className="col-span-2 font-bold text-gray-900">Task</span>
            <span className="col-span-5 font-bold text-gray-900">
              Description
            </span>
            <span className="col-span-5 text-right">
              {allowIssueCreation && (
                <Button
                  variant="text"
                  onClick={() => {
                    setIsIssueCreationModalOpen(true);
                  }}
                >
                  <AddIcon />
                  <span className="ml-2">Create a task</span>
                </Button>
              )}
            </span>
          </div>
          <div className="divide-y divide-gray-200">
            {issues.map((issue) => {
              const issueTag = parseIssueTagFromIssue(issue);
              return (
                <div className="px-4 py-3.5 grid-cols-12 grid" key={issue.id}>
                  <span className="col-span-2 text-gray-900">
                    <Link href={`/app/issue/${issueTag}`}>{issueTag}</Link>
                  </span>
                  <span className="col-span-6 text-gray-500">
                    <Link href={`/app/issue/${issueTag}`}>{issue.title}</Link>
                  </span>
                  <span className="col-span-2 flex justify-center">
                    {issue.assignee && <UserAvatar user={issue.assignee} />}
                  </span>
                  <span className="col-span-2 flex justify-end">
                    <IssueStatusPill
                      issueStatus={convertToIssueStatusType(issue.issueStatus)}
                    />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default IssuesList;
