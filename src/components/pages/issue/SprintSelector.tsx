import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { useAppContext } from '@src/components/AppContext';
import Dropdown from '@src/components/common/Forms/Dropdown';
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
    <Dropdown
      id="sprint-selector"
      label="Sprint"
      onChange={(item) => {
        const mutation = getUpdaterFunction(issueTag, 'sprintId');
        return mutation((item.id !== UNASSIGNED ? item.id : null) ?? null);
      }}
      onOpen={() => {
        setHasBeenOpened(true);
      }}
      initialOptionId={initialValue?.id}
      displayKey="name"
      options={dropdownOptions}
    />
  );
};

export default SprintSelector;
