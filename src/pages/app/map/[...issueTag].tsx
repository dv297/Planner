import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';
import FullScreenLoader from '../../../components/common/FullScreenLoader';
import ProjectMap from '../../../components/ProjectMap/ProjectMap';
import {
  ProjectMapContextProvider,
  useProjectMapContext,
} from '../../../components/ProjectMap/ProjectMapContext';
import ProjectMapEdgesSetService from '../../../services/ProjectMapEdgesSetService';
import ProjectMapPositionService from '../../../services/ProjectMapPositionService';
import QueryKeys from '../../../services/QueryKeys';

const Page = () => {
  const { isLoading, project, edgeSet } = useProjectMapContext();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!project?.issues || !project.positions || !edgeSet) {
    return <h1>Issue retrieving issues. Reload the page and try again.</h1>;
  }

  return (
    <ProjectMap
      issues={project?.issues}
      positions={project?.positions}
      edgesSet={edgeSet?.edges}
    />
  );
};

Page.getLayout = function getLayout(page: ReactNode) {
  return (
    <AppDefaultLayout>
      <ProjectMapContextProvider>{page}</ProjectMapContextProvider>
    </AppDefaultLayout>
  );
};

export default Page;
