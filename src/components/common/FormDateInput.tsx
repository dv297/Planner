import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface FormDateInputProps {
  label?: string;
  name: string;
  id?: string;
  required?: boolean;
  inputRef?: React.Ref<any>;
}

const FormDateInput = (props: FormDateInputProps) => {
  const { label, name, id, required, inputRef } = props;
  const { control } = useFormContext(); // retrieve all hook methods

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            {/* Hidden label because MUI doesn't actually add a label which can be used for testing */}
            {id && label && (
              <label className="hidden" htmlFor={id}>
                {label}
              </label>
            )}
            <DatePicker
              label={label}
              value={value}
              onChange={(newValue) => {
                onChange(newValue);
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    inputRef={inputRef}
                    required={required}
                    size="small"
                    label={label}
                    {...params}
                  />
                );
              }}
            />
          </>
        )}
      />
    </>
  );
};

export default FormDateInput;
