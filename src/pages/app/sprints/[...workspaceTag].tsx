import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import SprintCreationModalTrigger from '@src/components/pages/sprints/SprintCreationModalTrigger';
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

  const { data } = useQuery([QueryKeys.SPRINTS], () =>
    SprintsService.getSprintsForWorkspace(tag)
  );

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="flex flex-row items-center">
        <h1 className="text-lg font-bold text-slate-800 flex flex-grow">
          Sprints
        </h1>
      </div>

      {data?.length === 0 ? (
        <EmptyPlaceholder />
      ) : (
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-end w-full">
            <SprintCreationModalTrigger />
          </div>
          <div className="flex flex-col mt-4 border-solid border-gray-300 border rounded-md">
            {data.map((entry) => {
              return (
                <div
                  className="h-12 w-full border-solid border-b-gray-300 border-b last:border-b-0 flex flex-row items-center cursor-pointer"
                  key={entry.id}
                >
                  <div className="grid grid-rows-1 grid-cols-4 w-full pl-8">
                    <span className="col-span-1">{entry.name}</span>
                  </div>
                </div>
              );
            })}
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
