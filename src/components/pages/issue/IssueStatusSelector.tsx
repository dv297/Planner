import { useCallback, useState } from 'react';

import Dropdown, {
  SelectionValue,
} from '@src/components/common/Forms/Dropdown';
import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import IssueStatusType, {
  convertToIssueStatusType,
} from '@src/types/IssueStatusType';

interface IssueStatusSelectorProps {
  onChange: (value: string) => Promise<void>;
  initialValue: IssueStatusType;
}

const IssueStatusSelector = (props: IssueStatusSelectorProps) => {
  const { onChange, initialValue } = props;
  const [value, setValue] = useState(initialValue);
  const { displaySnackbar } = useSnackbar();

  const handleChange = useCallback(
    async (item: SelectionValue) => {
      try {
        console.log(item);
        await onChange(item.value);
        setValue(convertToIssueStatusType(item.value));
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
      options={[
        { value: IssueStatusType.PLANNING, label: 'Planning' },
        { value: IssueStatusType.NOT_STARTED, label: 'Not Started' },
        { value: IssueStatusType.IN_PROGRESS, label: 'In Progress' },
        {
          value: IssueStatusType.READY_FOR_REVIEW,
          label: 'Ready for Review',
        },
        { value: IssueStatusType.COMPLETE, label: 'Complete' },
        { value: IssueStatusType.CLOSED, label: 'Closed' },
      ]}
      initialValue={value}
      onChange={handleChange}
    />
  );
};

export default IssueStatusSelector;
