import { ReactNode } from 'react';
import Head from 'next/head';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import FullScreenLoader from '@src/components/common/FullScreenLoader';
import ProjectMap from '@src/components/ProjectMap/ProjectMap';
import {
  ProjectMapContextProvider,
  useProjectMapContext,
} from '@src/components/ProjectMap/ProjectMapContext';

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
      <Head>
        <title>Planner - Project Map</title>
      </Head>
      <ProjectMapContextProvider>{page}</ProjectMapContextProvider>
    </AppDefaultLayout>
  );
};

export default Page;
