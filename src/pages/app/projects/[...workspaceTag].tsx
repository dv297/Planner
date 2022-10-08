import { ReactNode } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import Button from '@src/components/common/Button';
import ConstrainDashboardContainer from '@src/components/ConstrainDashboardContainer';
import EmptyPlaceholder from '@src/components/EmptyPlaceholder';
import ProjectsService from '@src/services/ProjectsService';
import QueryKeys from '@src/services/QueryKeys';
import { parseIssueTagFromIssue } from '@src/utils/parseIssueTagFromIssue';
import timeInMinutes from '@src/utils/timeInMinutes';

const Page = () => {
  const router = useRouter();
  const { workspaceTag } = router.query;

  const tag = Array.isArray(workspaceTag) ? workspaceTag[0] : workspaceTag;

  const { data, isLoading } = useQuery(
    [QueryKeys.PROJECTS, { tag }],
    () => ProjectsService.getProjectsForWorkspace(tag),
    {
      staleTime: timeInMinutes(5),
    }
  );

  if (isLoading || !data) {
    return null;
  }

  if (data.length === 0) {
    return (
      <>
        <h1 className="text-lg font-bold">Projects</h1>
        <EmptyPlaceholder
          description={
            <div>
              Projects are a collection of issues that are closely related.
              Issues have to be grouped together in order to be shown on a
              project map.
            </div>
          }
          pluralItemName="projects"
          actionButton={
            <Button
              onClick={() => {
                router.push(`/app/project/create`);
              }}
            >
              <div className="mr-2">
                <AddIcon />
              </div>
              <span>Create a Project</span>
            </Button>
          }
        />
      </>
    );
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
  return (
    <AppDefaultLayout>
      <Head>
        <title>Planner - Projects</title>
      </Head>
      <ConstrainDashboardContainer>{page}</ConstrainDashboardContainer>
    </AppDefaultLayout>
  );
};

export default Page;
