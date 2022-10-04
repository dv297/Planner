import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useAppContext } from '@src/components/AppContext';
import IssuesList from '@src/components/common/IssuesList';
import QueryKeys from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';

const BacklogIssuesList = () => {
  const appContext = useAppContext();
  const workspaceTag = appContext.selectedWorkspace.tag;

  const { data, isLoading } = useQuery([QueryKeys.BACKLOG_ISSUES], () =>
    SprintsService.getIssuesInBacklog(workspaceTag)
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
      {data.issues.length > 0 ? (
        <IssuesList issues={data.issues} />
      ) : (
        <div className="text-lg">No issues in the backlog</div>
      )}
    </>
  );
};

export default BacklogIssuesList;
