import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import { useProjectMapContext } from '@src/components/ProjectMap/ProjectMapContext';
import IssueService from '@src/services/IssueService';

interface IssueUpdaterFunctionInput {
  tag: string | undefined;
  propertyName: string;
}

const useIssueUpdaterFunction = (input: IssueUpdaterFunctionInput) => {
  const { tag, propertyName } = input;
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const projectMapContext = useProjectMapContext();
  const refreshProjectMap = projectMapContext?.refresh;

  const updaterFunction = useCallback(
    async (textValue: string | null) => {
      try {
        await IssueService.updateIssue(tag, propertyName, textValue);
        queryClient.invalidateQueries();
        refreshProjectMap?.();
      } catch (err) {
        snackbar.displaySnackbar({
          message:
            'There was an error saving your change. Make a change and try again',
          severity: SnackbarSeverity.ERROR,
        });
      }
    },
    [tag, propertyName, queryClient, snackbar, refreshProjectMap]
  );

  return updaterFunction;
};

export default useIssueUpdaterFunction;
