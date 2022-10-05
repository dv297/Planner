import { createContext, ReactNode, useCallback, useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import { IssueSchema } from '@src/schemas/IssueSchema';
import IssueService from '@src/services/IssueService';
import QueryKeys from '@src/services/QueryKeys';
import { parseIssueTagFromIssue } from '@src/utils/parseIssueTagFromIssue';

type MoveToSprint = (
  issue: z.infer<typeof IssueSchema>,
  sprintId: string,
  sprintName: string
) => void;

type MoveToBacklog = (issue: z.infer<typeof IssueSchema>) => void;

interface SprintIssueDragContextInterface {
  moveToSprint: MoveToSprint;
  moveToBacklog: MoveToBacklog;
}

const SprintIssueDragContext = createContext<SprintIssueDragContextInterface>({
  moveToSprint: () => {},
  moveToBacklog: () => {},
});

interface SprintIssueDragContextProps {
  children: ReactNode;
}

const SprintIssueDragContextProvider = (props: SprintIssueDragContextProps) => {
  const { children } = props;

  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  const moveToSprint = useCallback<MoveToSprint>(
    async (issue, sprintId, sprintName) => {
      try {
        const fromSprintId = issue.sprintId ?? '';
        const issueTag = parseIssueTagFromIssue(issue);
        await IssueService.updateIssue(issueTag, 'sprintId', sprintId ?? null);
        await Promise.all([
          queryClient.invalidateQueries([QueryKeys.SPRINTS, { sprintId }]),
          queryClient.invalidateQueries([
            QueryKeys.SPRINTS,
            { sprintId: fromSprintId },
          ]),

          queryClient.invalidateQueries([QueryKeys.BACKLOG_ISSUES]),
        ]);

        snackbar.displaySnackbar({
          message: `Moved issue to ${sprintName}`,
          severity: SnackbarSeverity.SUCCESS,
        });
      } catch (err) {
        console.error('Issue moving sprint');
        console.error(err);
      }
    },
    [queryClient, snackbar]
  );

  const moveToBacklog = useCallback<MoveToBacklog>(
    async (issue) => {
      const fromSprintId = issue.sprintId ?? '';
      const issueTag = parseIssueTagFromIssue(issue);
      await IssueService.updateIssue(issueTag, 'sprintId', null);
      await Promise.all([
        queryClient.invalidateQueries([
          QueryKeys.SPRINTS,
          { sprintId: fromSprintId },
        ]),

        queryClient.invalidateQueries([QueryKeys.BACKLOG_ISSUES]),
      ]);

      snackbar.displaySnackbar({
        message: `Moved issue to backlog`,
        severity: SnackbarSeverity.SUCCESS,
      });
    },
    [queryClient, snackbar]
  );

  return (
    <SprintIssueDragContext.Provider
      value={{
        moveToSprint,
        moveToBacklog,
      }}
    >
      {children}
    </SprintIssueDragContext.Provider>
  );
};

const useSprintIssueDragContext = () => {
  const contextValue = useContext(SprintIssueDragContext);

  return contextValue;
};

export default SprintIssueDragContextProvider;
export { useSprintIssueDragContext };
