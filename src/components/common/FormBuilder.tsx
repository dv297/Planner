import { DefaultValues, FieldValues, Resolver } from 'react-hook-form';

import Button from '@src/components/common/Button';
import Form from '@src/components/common/Form';
import FormDateInput from '@src/components/common/FormDateInput';
import FormMarkdownEditor from '@src/components/common/FormMarkdownEditor';
import FormSubmitButton from '@src/components/common/FormSubmitButton';
import FormTextInput from '@src/components/common/FormTextInput';

function getComponentForInputType(input: Input<any>) {
  const key = input.name as string;
  switch (input.type) {
    case 'text': {
      return (
        <div key={key}>
          <FormTextInput
            id={key}
            label={input.label}
            name={key}
            required={input.isRequired}
          />
        </div>
      );
    }
    case 'markdown': {
      return (
        <div className="mt-6" key={key}>
          <label className="font-medium">{input.label}</label>
          <div className="mt-2">
            <FormMarkdownEditor name={key} key={key} />
          </div>
        </div>
      );
    }
    case 'date': {
      return (
        <div className="mt-6" key={key}>
          <FormDateInput
            id={key}
            name={key}
            label={input.label}
            required={input.isRequired}
          />
        </div>
      );
    }
    default: {
      return null;
    }
  }
}

interface Input<FormStructure> {
  name: keyof FormStructure;
  label: string;
  type: 'text' | 'markdown' | 'date';
  isRequired?: boolean;
}

interface FormBuilderProps<TFieldValues extends FieldValues = FieldValues> {
  onSubmit: (output: any) => Promise<void>;
  onCancel?: () => void;
  initialData: DefaultValues<TFieldValues>;
  inputs: Input<TFieldValues>[];
  resolver?: Resolver<TFieldValues>;
}

function FormBuilder<FormStructure extends Record<string, any>>(
  props: FormBuilderProps<FormStructure>
) {
  const { onSubmit, onCancel, initialData, inputs, resolver } = props;

  return (
    <Form defaultValues={initialData} onSubmit={onSubmit} resolver={resolver}>
      {() => {
        return (
          <div className="flex flex-col w-full">
            {inputs.map((input) => {
              return getComponentForInputType(input);
            })}

            <div className="mt-4 flex flex-row">
              <FormSubmitButton label="Submit" />
              {onCancel && (
                <div className="ml-3">
                  <Button
                    onClick={() => {
                      onCancel?.();
                    }}
                    variant="text"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      }}
    </Form>
  );
}

export default FormBuilder;
