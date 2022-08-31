import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface FormTextInputProps {
  label?: string;
  name: string;
  textFieldProps?: TextFieldProps;
  className?: string;
  id?: string;
}

const FormTextInput = (props: FormTextInputProps) => {
  const { label, name, textFieldProps, className, id } = props;
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
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value}
            label={label}
            className={className}
            id={id}
            {...applicationCustomizations}
          />
        )}
      />
    </>
  );
};

export default FormTextInput;