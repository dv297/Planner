import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';
import ProjectsService from '../../../services/ProjectsService';
import QueryKeys from '../../../services/QueryKeys';
import { parseIssueTagFromIssue } from '../../../utils/parseIssueTagFromIssue';
import issueTag from '../../api/project/[...issueTag]';

const Page = () => {
  const router = useRouter();
  const { workspaceTag } = router.query;

  const tag = Array.isArray(workspaceTag) ? workspaceTag[0] : workspaceTag;

  const { data } = useQuery([QueryKeys.PROJECTS], () =>
    ProjectsService.getProjectsForWorkspace(tag)
  );

  if (!data) {
    return null;
  }

  return (
    <>
      <h1 className="text-lg font-bold text-slate-800">Projects</h1>
      <div className="flex flex-col mt-4 border-solid border-gray-300 border rounded-lg">
        {data.map((entry) => {
          const issueTag = parseIssueTagFromIssue(entry.keyIssue);
          return (
            <div
              className="h-16 w-full border-solid border-b-gray-300 border-b last:border-b-0 flex flex-row items-center cursor-pointer"
              key={entry.id}
            >
              <Link href={`/app/project/${issueTag}`}>
                <div className="grid grid-rows-1 grid-cols-3 w-full pl-8">
                  <span className="grid-span-1">{issueTag}</span>
                  <span className="grid-span-2">{entry.keyIssue.title}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Page;
