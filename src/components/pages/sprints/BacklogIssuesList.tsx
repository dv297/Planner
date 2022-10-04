import { useDroppable } from '@dnd-kit/core';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useAppContext } from '@src/components/AppContext';
import IssuesList from '@src/components/common/IssuesList';
import DragTargetOverlay from '@src/components/DragTargetOverlay';
import QueryKeys from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';

const BacklogIssuesList = () => {
  const appContext = useAppContext();
  const workspaceTag = appContext.selectedWorkspace.tag;

  const { data, isLoading } = useQuery([QueryKeys.BACKLOG_ISSUES], () =>
    SprintsService.getIssuesInBacklog(workspaceTag)
  );

  const { setNodeRef, active } = useDroppable({
    id: `backlog-droppable`,
    data: {
      isBacklog: true,
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
        label="Move issue to backlog"
        isOpen={!!active}
        innerRef={setNodeRef}
      >
        {data.issues.length > 0 ? (
          <IssuesList issues={data.issues} />
        ) : (
          <div className="text-lg">No issues in the backlog</div>
        )}
      </DragTargetOverlay>
    </>
  );
};

export default BacklogIssuesList;
