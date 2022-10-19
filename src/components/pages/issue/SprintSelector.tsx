import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { useAppContext } from '@src/components/AppContext';
import Dropdown from '@src/components/common/Forms/Dropdown';
import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import SprintCreationModalTrigger from '@src/components/pages/sprints/SprintCreationModalTrigger';
import { useProjectMapContext } from '@src/components/ProjectMap/ProjectMapContext';
import { SprintSchema, SprintsListSchema } from '@src/schemas/SprintSchema';
import IssueService from '@src/services/IssueService';
import QueryKeys from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';

interface SprintSelectorProps {
  issueTag: string | undefined;
  initialValue: z.infer<typeof SprintSchema> | null;
}

const getUpdaterFunction =
  (tag: string | undefined, propertyName: string) =>
  async (textValue: string | null) => {
    await IssueService.updateIssue(tag, propertyName, textValue);
  };

const UNASSIGNED = 'UNASSIGNED';

const SprintSelector = (props: SprintSelectorProps) => {
  const { issueTag, initialValue } = props;

  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const appContext = useAppContext();
  const { data } = useQuery(
    [QueryKeys.SPRINTS],
    () =>
      SprintsService.getSprintsForWorkspace(appContext.selectedWorkspace.tag),
    {
      refetchOnWindowFocus: false,
      enabled: hasBeenOpened,
    }
  );

  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const projectMapContext = useProjectMapContext();

  const getUpdaterFunction =
    (tag: string | undefined, propertyName: string) =>
    async (textValue: string | null) => {
      try {
        await IssueService.updateIssue(tag, propertyName, textValue);
        queryClient.invalidateQueries();

        if (projectMapContext?.refresh) {
          projectMapContext.refresh();
        }
      } catch (err) {
        snackbar.displaySnackbar({
          message:
            'There was an error saving your change. Make a change and try again',
          severity: SnackbarSeverity.ERROR,
        });
      }
    };

  let dropdownOptions: z.infer<typeof SprintsListSchema> = [
    {
      id: UNASSIGNED,
      name: 'Unassigned',
    } as z.infer<typeof SprintSchema>,
  ];

  if (data?.sprints) {
    dropdownOptions = [...dropdownOptions, ...data.sprints];
  }

  if (
    initialValue &&
    !dropdownOptions.some((option) => option.id === initialValue.id)
  ) {
    dropdownOptions.push(initialValue);
  }

  return (
    <div>
      <Dropdown
        id="sprint-selector"
        label="Sprint"
        onChange={(item) =>
          getUpdaterFunction(
            issueTag,
            'sprintId'
          )((item.id !== UNASSIGNED ? item.id : null) ?? null)
        }
        onOpen={() => {
          setHasBeenOpened(true);
        }}
        initialOptionId={initialValue?.id}
        displayKey="name"
        options={dropdownOptions}
      />
      <SprintCreationModalTrigger variant="small" />
    </div>
  );
};

export default SprintSelector;
