import { ReactNode } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import Alert from '@src/components/common/Alert';
import Button from '@src/components/common/Button';
import ConstrainDashboardContainer from '@src/components/ConstrainDashboardContainer';
import EmptyPlaceholder from '@src/components/EmptyPlaceholder';
import KanbanBoard from '@src/components/pages/board/KanbanBoard';
import SprintCreationModalTrigger from '@src/components/pages/sprints/SprintCreationModalTrigger';
import QueryKeys from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';
import timeInMinutes from '@src/utils/timeInMinutes';
import useNavigateToWorkspaceSpecificPage from '@src/utils/useNavigateToWorkspaceSpecificPage';

const Board = () => {
  const router = useRouter();
  const { workspaceTag } = router.query;

  const tag = Array.isArray(workspaceTag) ? workspaceTag[0] : workspaceTag;
  const navigateToWorkspaceSpecificPage = useNavigateToWorkspaceSpecificPage();

  const { data: sprintsResponse, isLoading: isLoadingActiveSprintId } =
    useQuery(
      [QueryKeys.SPRINTS, { tag }],
      () => SprintsService.getSprintsForWorkspace(tag),
      {
        staleTime: timeInMinutes(5),
      }
    );

  const sprintId = sprintsResponse?.activeSprintId;

  const { data: sprintIssues, isInitialLoading: isLoadingSprintIssues } =
    useQuery(
      [QueryKeys.SPRINTS, { sprintId }],
      () => {
        if (sprintId) {
          return SprintsService.getIssuesForSprint(sprintId);
        }
      },
      {
        enabled: !!sprintsResponse?.activeSprintId,
      }
    );

  if (isLoadingActiveSprintId || isLoadingSprintIssues) {
    return null;
  }

  if (
    !isLoadingActiveSprintId &&
    !isLoadingSprintIssues &&
    (!sprintsResponse || sprintsResponse.sprints.length === 0)
  ) {
    return (
      <ConstrainDashboardContainer>
        <div className="flex flex-row items-center">
          <h1 className="text-lg font-bold flex flex-grow">Board</h1>
        </div>
        <EmptyPlaceholder
          description={
            <div>
              <p>
                Boards are a way of seeing all of the statuses for the issues in
                a particular sprint. To use the Board functionality, you first
                need to create a sprint and set it as &quot;Active&quot;.
              </p>
            </div>
          }
          pluralItemName="sprints"
          actionButton={<SprintCreationModalTrigger />}
        />
      </ConstrainDashboardContainer>
    );
  }

  if (
    sprintIssues?.issues === undefined ||
    sprintIssues?.issues?.length === 0
  ) {
    return (
      <ConstrainDashboardContainer>
        <div className="flex flex-row items-center">
          <h1 className="text-lg font-bold flex flex-grow">Sprints</h1>
        </div>
        <EmptyPlaceholder
          description={
            <div>
              <p>
                Boards are a way of seeing all of the statuses for the issues in
                a particular sprint. To use the Board functionality, you first
                need to create a sprint and set it as &quot;Active&quot;.
              </p>
            </div>
          }
          pluralItemName="issues in the active sprint"
          actionButton={
            <Button
              onClick={() => {
                navigateToWorkspaceSpecificPage('sprints');
              }}
            >
              Go to Sprint Page
            </Button>
          }
        />
      </ConstrainDashboardContainer>
    );
  }

  return (
    <div className="px-4 flex flex-col h-full">
      <div className="mb-4">
        <Alert message="Tip: You can drag and drop issues into the column statuses to update the status for that issue." />
      </div>
      <div className="h-full">
        <KanbanBoard issues={sprintIssues.issues} />
      </div>
    </div>
  );
};

Board.getLayout = function getLayout(page: ReactNode) {
  return (
    <AppDefaultLayout>
      <Head>
        <title>Planner - Board</title>
      </Head>
      {page}
    </AppDefaultLayout>
  );
};

export default Board;
