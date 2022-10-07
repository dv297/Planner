import { ReactNode } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
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
    <div className="px-4">
      <div className="bg-blue-100 py-4 rounded-lg mb-4 flex flex-row items-center text-lg text-blue-500">
        <div className="w-12 px-6 flex items-center justify-center">
          <InfoOutlinedIcon />
        </div>
        <p className="leading-6 pr-4">
          Tip: You can drag and drop issues into the column statuses to update
          the status for that issue.
        </p>
      </div>
      <KanbanBoard issues={sprintIssues.issues} />
    </div>
  );
};

Board.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Board;
