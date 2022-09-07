import AddIcon from '@mui/icons-material/Add';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';
import Button from '../../../components/common/Button';
import ProjectsService from '../../../services/ProjectsService';
import QueryKeys from '../../../services/QueryKeys';
import { parseIssueTagFromIssue } from '../../../utils/parseIssueTagFromIssue';

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
      <div className="flex flex-row items-center">
        <h1 className="text-lg font-bold text-slate-800 flex flex-grow">
          Projects
        </h1>
        <Button
          onClick={() => {
            router.push(`/app/project/create`);
          }}
          variant="text"
        >
          <div className="mr-2">
            <AddIcon />
          </div>
          <span>Create a Project</span>
        </Button>
      </div>
      <div className="flex flex-col mt-4 border-solid border-gray-300 border rounded-md">
        {data.map((entry) => {
          const issueTag = parseIssueTagFromIssue(entry.keyIssue);
          return (
            <div
              className="h-12 w-full border-solid border-b-gray-300 border-b last:border-b-0 flex flex-row items-center cursor-pointer"
              key={entry.id}
            >
              <Link href={`/app/project/${issueTag}`}>
                <div className="grid grid-rows-1 grid-cols-4 w-full pl-8">
                  <span className="col-span-1">{issueTag}</span>
                  <span className="col-span-3">{entry.keyIssue.title}</span>
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
