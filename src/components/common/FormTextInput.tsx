import * as React from 'react';
import { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import TextInput from '@src/components/common/Forms/TextInput';

interface FormTextInputProps {
  label: string;
  name: string;
  id: string;
  required?: boolean;
  inputRef?: React.Ref<any>;
  endAdornment?: ReactNode;
}

const FormTextInput = (props: FormTextInputProps) => {
  const { label, name, id, required, inputRef, endAdornment } = props;
  const { control } = useFormContext(); // retrieve all hook methods

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
            <TextInput
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              id={id}
              error={!!error}
              helperText={error?.message}
              required={required}
              inputRef={inputRef}
              label={label}
              name={props.name}
              endAdornment={endAdornment}
            />
          </>
        )}
      />
    </>
  );
};

export default FormTextInput;
