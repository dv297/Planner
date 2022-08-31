import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface FormTextInputProps {
  label?: string;
  name: string;
  textFieldProps?: TextFieldProps;
  className?: string;
  id?: string;
  required?: boolean;
}

const FormTextInput = (props: FormTextInputProps) => {
  const { label, name, textFieldProps, className, id, required } = props;
  const { control } = useFormContext(); // retrieve all hook methods

  const applicationCustomizations: TextFieldProps = {
    size: 'small',
    ...textFieldProps,
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextField
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              label={label}
              className={className}
              id={id}
              error={!!error}
              helperText={error?.message}
              required={required}
              {...applicationCustomizations}
            />
          </>
        )}
      />
    </>
  );
};

export default FormTextInput;
