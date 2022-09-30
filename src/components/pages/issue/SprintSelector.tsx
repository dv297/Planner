import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { z } from 'zod';

import { SprintSchema } from '../../../schemas/SprintSchema';
import IssueService from '../../../services/IssueService';
import QueryKeys from '../../../services/QueryKeys';
import SprintsService from '../../../services/SprintsService';
import { useAppContext } from '../../AppContext';
import GenericSelectorView from './GenericSelectorView';

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
