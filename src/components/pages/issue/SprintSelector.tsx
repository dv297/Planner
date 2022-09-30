import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { useAppContext } from '@src/components/AppContext';
import GenericSelectorView from '@src/components/pages/issue/GenericSelectorView';
import { SprintSchema } from '@src/schemas/SprintSchema';
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

  return (
    <GenericSelectorView
      id="sprint-selector"
      label="Sprint"
      onChange={getUpdaterFunction(issueTag, 'sprintId')}
      onOpen={() => {
        setHasBeenOpened(true);
      }}
      initialValue={initialValue}
      values={data}
      displayKey="name"
    />
  );
};

export default SprintSelector;
