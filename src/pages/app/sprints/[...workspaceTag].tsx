import { ReactNode } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import Button from '@src/components/common/Button';
import SprintCreationModalTrigger from '@src/components/pages/sprints/SprintCreationModalTrigger';
import SprintsList from '@src/components/pages/sprints/SprintsList';
import QueryKeys from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';

const EmptyPlaceholder = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center border-solid border-gray-300 border-b mb-8">
        <div className="mt-6 mr-6 prose">
          <p>
            Sprints are a way to group a set of issues that will be completed or
            delivered at roughly the same time. Think of them as mini-goal lines
            for your project.
          </p>
          <p>
            They can be helpful for organizing when certain groups of issues
            will be complete, but you do not necessarily have to use sprints to
            use Planner.
          </p>
        </div>
        <div>
          <div className="flex flex-col items-center w-full text-center">
            <Image
              alt="No entries in list"
              src="/images/empty-list-compressed.png"
              height={250}
              width={250}
              layout="fixed"
              quality={50}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full text-center">
        <span>
          It looks like you do not have any sprints! Let&apos;s create one!
        </span>
        <div className="mt-4">
          <SprintCreationModalTrigger />
        </div>
      </div>
    </div>
  );
};

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
        <EmptyPlaceholder />
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
