import { useDroppable } from '@dnd-kit/core';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import IssuesList from '@src/components/common/IssuesList';
import DragTargetOverlay from '@src/components/DragTargetOverlay';
import QueryKeys, { getDynamicQueryKey } from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';

interface SprintIssuesListProps {
  sprintId: string;
  sprintName: string;
}

const SprintIssuesList = (props: SprintIssuesListProps) => {
  const { sprintId, sprintName } = props;
  const { data, isLoading } = useQuery(
    [getDynamicQueryKey(QueryKeys.SPRINTS, sprintId)],
    () => SprintsService.getIssuesForSprint(sprintId)
  );
  const { setNodeRef, active } = useDroppable({
    id: `sprint-droppable-${sprintId}`,
    data: {
      sprintId,
      sprintName,
    },
  });

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <DragTargetOverlay
        label={`Add issue to ${sprintName}`}
        isOpen={!!active}
        innerRef={setNodeRef}
      >
        {data.issues.length > 0 ? (
          <IssuesList issues={data.issues} />
        ) : (
          <div className="text-lg">No issues assigned to this sprint yet</div>
        )}
      </DragTargetOverlay>
    </>
  );
};

export default SprintIssuesList;
