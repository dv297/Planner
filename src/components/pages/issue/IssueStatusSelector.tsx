import { useCallback, useState } from 'react';
import { InputLabel } from '@material-ui/core';
import { FormControl, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/Select';

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
    async (event: SelectChangeEvent) => {
      try {
        const updatedValue = event.target.value;
        await onChange(updatedValue);
        setValue(convertToIssueStatusType(updatedValue));
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
    <FormControl fullWidth>
      <InputLabel id="input-status-selector-label">Status</InputLabel>
      <Select
        labelId="input-status-selector-label"
        id="input-status-selector"
        value={value}
        label="Status"
        onChange={handleChange}
        size="small"
      >
        <MenuItem value={IssueStatusType.PLANNING}>Planning</MenuItem>
        <MenuItem value={IssueStatusType.NOT_STARTED}>Not Started</MenuItem>
        <MenuItem value={IssueStatusType.IN_PROGRESS}>In Progress</MenuItem>
        <MenuItem value={IssueStatusType.READY_FOR_REVIEW}>
          Ready for Review
        </MenuItem>
        <MenuItem value={IssueStatusType.COMPLETE}>Complete</MenuItem>
        <MenuItem value={IssueStatusType.CLOSED}>Closed</MenuItem>
      </Select>
    </FormControl>
  );
};

export default IssueStatusSelector;
