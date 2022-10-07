import { ReactNode } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import KanbanBoard from '@src/components/pages/board/KanbanBoard';
import QueryKeys from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';
import timeInMinutes from '@src/utils/timeInMinutes';

const Board = () => {
  const router = useRouter();
  const { workspaceTag } = router.query;

  const tag = Array.isArray(workspaceTag) ? workspaceTag[0] : workspaceTag;

  const { data: sprintsResponse, isLoading: isLoadingActiveSprintId } =
    useQuery(
      [QueryKeys.SPRINTS, { tag }],
      () => SprintsService.getSprintsForWorkspace(tag),
      {
        staleTime: timeInMinutes(5),
      }
    );

  const sprintId = sprintsResponse?.activeSprintId;

  const { data: sprintIssues, isLoading: isLoadingSprintIssues } = useQuery(
    [QueryKeys.SPRINTS, { sprintId }],
    () => {
      if (sprintId) {
        return SprintsService.getIssuesForSprint(sprintId);
      }
    },
    {
      enabled: !!sprintId,
    }
  );

  if (isLoadingActiveSprintId || isLoadingSprintIssues) {
    return null;
  }

  if (!isLoadingActiveSprintId && !isLoadingSprintIssues && !sprintIssues) {
    return (
      <div>It looks like your team does not have an active sprint set yet!</div>
    );
  }

  if (!sprintIssues) {
    return <div>There are no issues in the active sprint.</div>;
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
