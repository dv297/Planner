import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import ConstrainDashboardContainer from '@src/components/ConstrainDashboardContainer';
import SprintCreationModalTrigger from '@src/components/pages/sprints/SprintCreationModalTrigger';
import SprintsEditList from '@src/components/pages/sprints/SprintsEditList';
import QueryKeys from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';
import timeInMinutes from '@src/utils/timeInMinutes';

const Page = () => {
  const router = useRouter();
  const { workspaceTag } = router.query;

  const tag = Array.isArray(workspaceTag) ? workspaceTag[0] : workspaceTag;

  const { data: sprintsResponse } = useQuery(
    [QueryKeys.SPRINTS, { tag }],
    () => SprintsService.getSprintsForWorkspace(tag),
    {
      staleTime: timeInMinutes(5),
    }
  );

  if (!sprintsResponse) {
    return null;
  }

  const { sprints, activeSprintId } = sprintsResponse;

  return (
    <>
      <div className="flex flex-row items-center">
        <h1 className="text-lg font-bold text-slate-800 flex flex-grow">
          Edit Sprints
        </h1>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-end w-full">
          <SprintCreationModalTrigger />
        </div>
        <div className="mt-8">
          <SprintsEditList sprints={sprints} activeSprintId={activeSprintId} />
        </div>
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactNode) {
  return (
    <AppDefaultLayout>
      <ConstrainDashboardContainer>{page}</ConstrainDashboardContainer>
    </AppDefaultLayout>
  );
};

export default Page;
