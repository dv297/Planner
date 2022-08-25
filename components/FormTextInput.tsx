import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface FormTextInputProps {
  label: string;
  name: string;
  textFieldProps?: TextFieldProps;
  className?: string;
}

const FormTextInput = (props: FormTextInputProps) => {
  const { label, name, textFieldProps, className } = props;
  const { control } = useFormContext(); // retrieve all hook methods

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value}
            label={label}
            className={className}
            {...textFieldProps}
          />
        )}
      />
    </>
  );
};

export default FormTextInput;
