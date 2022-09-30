import { InputLabel } from '@material-ui/core';
import { FormControl, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/Select';
import { useCallback, useState } from 'react';

import { SnackbarSeverity, useSnackbar } from '../../common/Snackbar';

export interface GenericSelectorOption extends Record<string, any> {
  id: string;
}

interface GenericSelectorProps<TValue extends GenericSelectorOption> {
  id: string;
  label: string;
  onChange: (value: string | null) => Promise<void>;
  onOpen: () => void;
  initialValue: TValue | null;
  values: TValue[] | undefined;
  displayKey: keyof TValue;
}

const UNASSIGNED = 'UNASSIGNED_VALUE';

function GenericSelectorView<TValue extends GenericSelectorOption>(
  props: GenericSelectorProps<TValue>
) {
  const {
    id,
    label,
    onChange,
    onOpen,
    initialValue,
    values = [],
    displayKey,
  } = props;
  const [value, setValue] = useState(initialValue?.id || UNASSIGNED);
  const { displaySnackbar } = useSnackbar();

  const handleChange = useCallback(
    async (event: SelectChangeEvent) => {
      try {
        const updatedValue =
          event.target.value === UNASSIGNED ? null : event.target.value;
        await onChange(updatedValue);
        setValue(event.target.value);
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

  const dropdownOptions = [...values];
  if (dropdownOptions.length === 0 && initialValue) {
    dropdownOptions.push(initialValue);
  }

  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId="input-status-selector-label"
        id={id}
        value={value}
        label={label}
        onChange={handleChange}
        size="small"
        onOpen={onOpen}
        renderValue={(value) => {
          const selectedValue = dropdownOptions.find(
            (option) => option.id === value
          );

          return (
            <div className="flex flex-row items-center">
              {selectedValue?.[displayKey] ?? 'Unassigned'}
            </div>
          );
        }}
      >
        <MenuItem value={UNASSIGNED}>Unassigned</MenuItem>
        {initialValue && (
          <MenuItem value={initialValue.id}>
            {initialValue[displayKey]}
          </MenuItem>
        )}
        {dropdownOptions
          .filter((value) => {
            return value.id !== initialValue?.id;
          })
          .map((value) => {
            return (
              <MenuItem key={value.id} value={value.id}>
                {value[displayKey]}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}

export default GenericSelectorView;
