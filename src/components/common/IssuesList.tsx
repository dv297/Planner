import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';

import { IssuesListSchema } from '../../schemas/IssueSchema';
import { convertToIssueStatusType } from '../../types/IssueStatusType';
import { parseIssueTagFromIssue } from '../../utils/parseIssueTagFromIssue';
import IssueCreationModal from '../IssueCreationModal';
import IssueStatusPill from '../IssueStatusPill';
import Button from './Button';

interface IssuesListProps {
  projectId: string;
  issues: z.infer<typeof IssuesListSchema>;
}

const IssuesList = (props: IssuesListProps) => {
  const { projectId, issues } = props;
  const [isIssueCreationModalOpen, setIsIssueCreationModalOpen] =
    useState(false);

  return (
    <>
      <IssueCreationModal
        isOpen={isIssueCreationModalOpen}
        setIsOpen={setIsIssueCreationModalOpen}
        projectId={projectId}
      />
      <div className="w-full rounded-md text-left border-solid border-gray-300 border">
        <div className="divide-y divide-gray-300">
          <div className="flex flex-row items-center bg-gray-50 divide-gray-200 px-4 py-2 grid-cols-12 grid">
            <span className="col-span-2 font-bold text-gray-900">Task</span>
            <span className="col-span-8 font-bold text-gray-900">
              Description
            </span>
            <span className="col-span-2 text-right">
              <Button
                variant="text"
                onClick={() => {
                  setIsIssueCreationModalOpen(true);
                }}
              >
                <AddIcon />
                <span className="ml-2">Create a task</span>
              </Button>
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
                  <span className="col-span-8 text-gray-500">
                    <Link href={`/app/issue/${issueTag}`}>{issue.title}</Link>
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
