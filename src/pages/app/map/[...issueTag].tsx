import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';
import ProjectMap from '../../../components/ProjectMap/ProjectMap';
import ProjectMapPositionService from '../../../services/ProjectMapPositionService';
import QueryKeys from '../../../services/QueryKeys';

const Page = () => {
  const router = useRouter();

  const { issueTag } = router.query;

  const tag = Array.isArray(issueTag) ? issueTag[0] : issueTag;

  const { data: project } = useQuery([QueryKeys.PROJECT], () =>
    ProjectMapPositionService.getProjectMapPosition(tag)
  );

  if (!project?.issues || !project.positions) {
    return <h1>Issue retrieving issues. Reload the page and try again.</h1>;
  }

  return <ProjectMap issues={project?.issues} positions={project?.positions} />;
};

Page.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Page;
