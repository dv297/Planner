import { useCallback, useState } from 'react';

import Dropdown, {
  SelectionValue,
} from '@src/components/common/Forms/Dropdown';
import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';

export interface GenericSelectorOption extends Record<string, any> {
  id: string;
}

interface GenericSelectorProps<TValue extends GenericSelectorOption> {
  id: string;
  label: string;
  onChange: (value: string | null) => Promise<void>;
  onOpen: () => void;
  initialValue: any;
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
    async (selection: SelectionValue) => {
      try {
        const updatedValue =
          selection.value === UNASSIGNED ? null : selection.value;
        await onChange(updatedValue);
        setValue(selection.value);
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
    <>
      <Dropdown
        id={id}
        label={label}
        options={[
          { label: 'Unassigned', value: UNASSIGNED },
          ...dropdownOptions
            .filter((value) => {
              return value.id !== initialValue?.value;
            })
            .map((option) => ({
              value: option.id,
              label: option[displayKey],
            })),
        ]}
        initialValue={value}
        onChange={handleChange}
        onOpen={onOpen}
      />
    </>
  );
}

export default GenericSelectorView;
