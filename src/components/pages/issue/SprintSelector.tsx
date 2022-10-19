import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { useAppContext } from '@src/components/AppContext';
import Dropdown from '@src/components/common/Forms/Dropdown';
import SprintCreationModalTrigger from '@src/components/pages/sprints/SprintCreationModalTrigger';
import useIssueUpdaterFunction from '@src/hooks/useIssueUpdaterFunction';
import { SprintSchema, SprintsListSchema } from '@src/schemas/SprintSchema';
import QueryKeys from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';

interface SprintSelectorProps {
  issueTag: string | undefined;
  initialValue: z.infer<typeof SprintSchema> | null;
}

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

  const updateIssueSprint = useIssueUpdaterFunction({
    tag: issueTag,
    propertyName: 'sprintId',
  });

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
          updateIssueSprint((item.id !== UNASSIGNED ? item.id : null) ?? null)
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
