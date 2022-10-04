import { ReactNode } from 'react';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { z } from 'zod';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import ConstrainDashboardContainer from '@src/components/ConstrainDashboardContainer';
import EmptyPlaceholder from '@src/components/EmptyPlaceholder';
import SprintCreationModalTrigger from '@src/components/pages/sprints/SprintCreationModalTrigger';
import SprintsList from '@src/components/pages/sprints/SprintsList';
import { IssueSchema } from '@src/schemas/IssueSchema';
import IssueService from '@src/services/IssueService';
import QueryKeys, { getDynamicQueryKey } from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';
import { parseIssueTagFromIssue } from '@src/utils/parseIssueTagFromIssue';

const Page = () => {
  const router = useRouter();
  const { workspaceTag } = router.query;

  const tag = Array.isArray(workspaceTag) ? workspaceTag[0] : workspaceTag;

  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  const { data: sprints } = useQuery([QueryKeys.SPRINTS], () =>
    SprintsService.getSprintsForWorkspace(tag)
  );

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

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
        <DndContext
          sensors={sensors}
          onDragEnd={async (event) => {
            const issueDragged = event.active.data.current;
            const targetSprintData = event.over?.data.current;

            if (issueDragged?.id && targetSprintData) {
              const { sprintId } = targetSprintData;
              const issueTag = parseIssueTagFromIssue(
                issueDragged as z.infer<typeof IssueSchema>
              );
              await IssueService.updateIssue(issueTag, 'sprintId', sprintId);
              await queryClient.invalidateQueries([
                getDynamicQueryKey(QueryKeys.SPRINTS, sprintId),
              ]);

              snackbar.displaySnackbar({
                message: 'Moved issue to sprint',
                severity: SnackbarSeverity.SUCCESS,
              });
            }
          }}
        >
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-end w-full">
              <SprintCreationModalTrigger />
            </div>
            <div className="mt-8">
              <SprintsList sprints={sprints} />
            </div>
          </div>
        </DndContext>
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
