import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';
import ProjectsService from '../../../services/ProjectsService';
import QueryKeys from '../../../services/QueryKeys';

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
      <h1>Projects</h1>
      <div className="flex flex-col">
        {data.map((entry) => {
          return (
            <a href="#" key={entry.id}>
              {entry.title}
            </a>
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
