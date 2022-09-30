import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import IssuesList from '@src/components/common/IssuesList';
import QueryKeys, { getDynamicQueryKey } from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';

interface SprintIssuesListProps {
  sprintId: string;
}

const SprintIssuesList = (props: SprintIssuesListProps) => {
  const { sprintId } = props;
  const { data, isLoading } = useQuery(
    [getDynamicQueryKey(QueryKeys.SPRINTS, sprintId)],
    () => SprintsService.getIssuesForSprint(sprintId)
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
        <div className="text-lg">No issues assigned to this sprint yet</div>
      )}
    </>
  );
};

export default SprintIssuesList;
