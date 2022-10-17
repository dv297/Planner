import { useCallback, useState } from 'react';

import Dropdown, {
  GenericSelectorOption,
} from '@src/components/common/Forms/Dropdown';
import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import IssueStatusType, {
  convertToIssueStatusType,
} from '@src/types/IssueStatusType';

interface IssueStatusSelectorProps {
  onChange: (value: string) => Promise<void>;
  initialValue: IssueStatusType;
}

const options = [
  { id: IssueStatusType.PLANNING, label: 'Planning' },
  { id: IssueStatusType.NOT_STARTED, label: 'Not Started' },
  { id: IssueStatusType.IN_PROGRESS, label: 'In Progress' },
  {
    id: IssueStatusType.READY_FOR_REVIEW,
    label: 'Ready for Review',
  },
  { id: IssueStatusType.COMPLETE, label: 'Complete' },
  { id: IssueStatusType.CLOSED, label: 'Closed' },
];

const IssueStatusSelector = (props: IssueStatusSelectorProps) => {
  const { onChange, initialValue } = props;
  const [value, setValue] = useState(initialValue);
  const { displaySnackbar } = useSnackbar();

  const handleChange = useCallback(
    async (item: GenericSelectorOption<{ id: string }>) => {
      try {
        if (item.id) {
          await onChange(item.id);
          setValue(convertToIssueStatusType(item.id));
        }
      } catch (err) {
        console.error(err);
        displaySnackbar({
          severity: SnackbarSeverity.ERROR,
          message:
            'There was an error saving the field. Please try again later.',
        });
      }
    },
    [onChange, displaySnackbar]
  );

  return (
    <Dropdown
      id="sprint-status"
      label="Status"
      options={options}
      initialOptionId={value}
      onChange={(item) => handleChange(item)}
      displayKey="label"
    />
  );
};

export default IssueStatusSelector;
