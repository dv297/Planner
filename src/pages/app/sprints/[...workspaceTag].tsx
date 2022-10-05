import { ReactNode } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import ConstrainDashboardContainer from '@src/components/ConstrainDashboardContainer';
import EmptyPlaceholder from '@src/components/EmptyPlaceholder';
import SprintCreationModalTrigger from '@src/components/pages/sprints/SprintCreationModalTrigger';
import SprintsList from '@src/components/pages/sprints/SprintsList';
import QueryKeys from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';
import timeInMinutes from '@src/utils/timeInMinutes';

const Page = () => {
  const router = useRouter();
  const { workspaceTag } = router.query;

  const tag = Array.isArray(workspaceTag) ? workspaceTag[0] : workspaceTag;

  const { data: sprints } = useQuery(
    [QueryKeys.SPRINTS, { tag }],
    () => SprintsService.getSprintsForWorkspace(tag),
    {
      staleTime: timeInMinutes(5),
    }
  );

  if (!sprints) {
    return null;
  }

  return (
    <>
      <div className="flex flex-row items-center">
        <h1 className="text-lg font-bold text-slate-800 flex flex-grow">
          Sprints
        </h1>
      </div>

      {sprints?.length === 0 ? (
        <EmptyPlaceholder
          description={
            <>
              <p>
                Sprints are a way to group a set of issues that will be
                completed or delivered at roughly the same time. Think of them
                as mini-goal lines for your project.
              </p>
              <p>
                They can be helpful for organizing when certain groups of issues
                will be complete, but you do not necessarily have to use sprints
                to use Planner.
              </p>
            </>
          }
          pluralItemName="sprints"
          actionButton={<SprintCreationModalTrigger />}
        />
      ) : (
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-end w-full">
            <SprintCreationModalTrigger />
          </div>
          <div className="mt-8">
            <div className="bg-blue-100 py-4 rounded-lg mb-2 flex flex-row items-center text-lg text-blue-500">
              <div className="w-12 px-6 flex items-center justify-center">
                <InfoOutlinedIcon />
              </div>
              <p className="leading-6 pr-4">
                Tip: You can drag and drop issues into expanded sprint to move
                that issue to that sprint.
              </p>
            </div>
            <SprintsList sprints={sprints} />
          </div>
        </div>
      )}
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
