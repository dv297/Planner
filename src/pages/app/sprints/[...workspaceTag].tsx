import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import EmptyPlaceholder from '@src/components/EmptyPlaceholder';
import SprintCreationModalTrigger from '@src/components/pages/sprints/SprintCreationModalTrigger';
import SprintsList from '@src/components/pages/sprints/SprintsList';
import QueryKeys from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';

const Page = () => {
  const router = useRouter();
  const { workspaceTag } = router.query;

  const tag = Array.isArray(workspaceTag) ? workspaceTag[0] : workspaceTag;

  const { data: sprints } = useQuery([QueryKeys.SPRINTS], () =>
    SprintsService.getSprintsForWorkspace(tag)
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
            <SprintsList sprints={sprints} />
          </div>
        </div>
      )}
    </>
  );
};

Page.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Page;
