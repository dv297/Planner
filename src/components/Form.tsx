import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface FormProps<FormStructure> {
  children: ({
    keys,
  }: {
    keys: Record<keyof FormStructure, string>;
  }) => ReactNode;
  defaultValues: FormStructure;
  onSubmit: (data: FormStructure) => void;
}

function Form<FormStructure>(props: FormProps<FormStructure>) {
  const { children, defaultValues, onSubmit } = props;
  const methods = useForm({
    defaultValues: defaultValues as Record<string, any>,
  });

  const submissionHandler = methods.handleSubmit(onSubmit);

  const keys = Object.keys(defaultValues).reduce((acc, entry) => {
    acc[entry] = entry;
    return acc;
  }, {} as Record<keyof FormStructure, string>);

  const handleSubmit = (event) => {
    event.preventDefault();
    return submissionHandler();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>{children({ keys })}</form>
    </FormProvider>
  );
}

export default Form;
