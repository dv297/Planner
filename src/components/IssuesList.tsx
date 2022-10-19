import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { z } from 'zod';

import Button from '@src/components/common/Button';
import IssueCreationModal from '@src/components/IssueCreationModal';
import IssueListItem from '@src/components/IssueListItem';
import { IssuesListSchema } from '@src/schemas/IssueSchema';

interface IssuesListProps {
  projectId?: string;
  issues: z.infer<typeof IssuesListSchema>;
  allowIssueCreation?: boolean;
  allowDrag?: boolean;
}

const IssuesList = (props: IssuesListProps) => {
  const { projectId, issues, allowIssueCreation = false, allowDrag } = props;
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
      <div className="w-full rounded-md text-left border-solid border-gray-300 border text-sm sm:text-md">
        <div className="divide-y divide-gray-300">
          <div className="flex flex-row items-center bg-gray-50 dark:bg-slate-700 divide-gray-200 px-4 py-2 grid-cols-12 grid">
            <span className="col-span-2 font-bold text-gray-900 dark:text-gray-50">
              Task
            </span>
            <span className="col-span-5 font-bold text-gray-900 dark:text-gray-50 invisible sm:visible">
              Description
            </span>
            <span className="col-span-5 text-right">
              {allowIssueCreation && (
                <Button
                  variant="text"
                  onClick={() => {
                    setIsIssueCreationModalOpen(true);
                  }}
                  icon={<AddIcon />}
                >
                  Create a task
                </Button>
              )}
            </span>
          </div>
          <div className="divide-y divide-gray-200">
            {issues.length === 0 && (
              <div className="h-24 flex justify-center items-center">
                <p className="italic">No tasks</p>
              </div>
            )}
            {issues.map((issue) => {
              return (
                <IssueListItem
                  issue={issue}
                  key={issue.id}
                  allowDrag={allowDrag}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default IssuesList;
