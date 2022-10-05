import { useDrop } from 'react-dnd';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { useAppContext } from '@src/components/AppContext';
import IssuesList from '@src/components/common/IssuesList';
import DragTargetOverlay from '@src/components/DragTargetOverlay';
import { useSprintIssueDragContext } from '@src/components/SprintIssueDragContext';
import { IssueSchema } from '@src/schemas/IssueSchema';
import QueryKeys from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';

const BacklogIssuesList = () => {
  const appContext = useAppContext();
  const workspaceTag = appContext.selectedWorkspace.tag;

  const sprintIssueDragContext = useSprintIssueDragContext();
  const { data, isLoading } = useQuery([QueryKeys.BACKLOG_ISSUES], () =>
    SprintsService.getIssuesInBacklog(workspaceTag)
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
        sprintIssueDragContext.moveToBacklog(issue);
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
        label="Move issue to backlog"
        isOpen={canDrop}
        innerRef={drop}
        id="backlog-list"
      >
        {data.issues.length > 0 ? (
          <IssuesList issues={data.issues} allowDrag />
        ) : (
          <div className="text-lg">No issues in the backlog</div>
        )}
      </DragTargetOverlay>
    </>
  );
};

export default BacklogIssuesList;
