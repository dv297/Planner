import { useDrop } from 'react-dnd';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import DragTargetOverlay from '@src/components/DragTargetOverlay';
import IssuesList from '@src/components/IssuesList';
import { useSprintIssueDragContext } from '@src/components/SprintIssueDragContext';
import { IssueSchema } from '@src/schemas/IssueSchema';
import QueryKeys, { getDynamicQueryKey } from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';

interface SprintIssuesListProps {
  sprintId: string;
  sprintName: string;
  index: number;
}

const SprintIssuesList = (props: SprintIssuesListProps) => {
  const { sprintId, sprintName, index } = props;
  const sprintIssueDragContext = useSprintIssueDragContext();
  const { data, isLoading } = useQuery(
    [getDynamicQueryKey(QueryKeys.SPRINTS, sprintId)],
    () => SprintsService.getIssuesForSprint(sprintId)
  );
  const [{ canDrop }, drop] = useDrop(
    () => ({
      // The type (or types) to accept - strings or symbols
      accept: 'BOX',
      // Props to collect
      collect: (monitor) => {
        return {
          isOver: monitor.isOver(),
          canDrop:
            monitor.canDrop() &&
            !data?.issues.some(
              (issue) =>
                issue.id ===
                (monitor.getItem() as z.infer<typeof IssueSchema>).id
            ),
        };
      },
      drop: (item) => {
        const issue = IssueSchema.parse(item);
        sprintIssueDragContext.moveToSprint(issue, sprintId, sprintName);
      },
    }),
    [data]
  );

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
        label={`Move issue to ${sprintName}`}
        isOpen={canDrop}
        innerRef={drop}
        id={`sprint-drag-overlay-${index}`}
      >
        {data.issues.length > 0 ? (
          <IssuesList issues={data.issues} allowDrag />
        ) : (
          <div className="text-lg">No issues assigned to this sprint yet</div>
        )}
      </DragTargetOverlay>
    </>
  );
};

export default SprintIssuesList;
