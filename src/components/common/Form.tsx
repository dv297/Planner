import { FocusEvent, ReactNode, SyntheticEvent } from 'react';
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  FormState,
  Resolver,
  useForm,
} from 'react-hook-form';

interface FormProps<TFieldValues extends FieldValues = FieldValues> {
  children: ({
    keys,
    formState,
  }: {
    keys: Record<keyof TFieldValues, string>;
    formState: FormState<TFieldValues>;
  }) => ReactNode;
  defaultValues: DefaultValues<TFieldValues>;
  onSubmit?: (data: TFieldValues) => void;
  resolver?: Resolver<TFieldValues>;
  onBlur?: (data: TFieldValues, event: FocusEvent<HTMLFormElement>) => void;
}

function Form<FormStructure extends Record<string, any>>(
  props: FormProps<FormStructure>
) {
  const { children, defaultValues, onSubmit, resolver, onBlur } = props;

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: defaultValues as Record<string, any>,
    // @ts-ignore
    resolver,
  });

  const submissionHandler = methods.handleSubmit(
    onSubmit as (data: Record<string, any>) => void
  );

  const { formState } = methods;

  const keys = Object.keys(defaultValues).reduce((acc, entry) => {
    acc[entry as keyof FormStructure] = entry;
    return acc;
  }, {} as Record<keyof FormStructure, string>);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    return submissionHandler();
  };

  const handleBlur = (event: FocusEvent<HTMLFormElement>) => {
    if (onBlur) {
      event.preventDefault();

      onBlur(methods.getValues() as FormStructure, event);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} onBlur={handleBlur} className="w-full">
        {children({
          keys,
          formState: formState as FormState<FormStructure>,
        })}
      </form>
    </FormProvider>
  );
}

export default Form;
