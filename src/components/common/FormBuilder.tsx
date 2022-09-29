import { FieldValues } from 'react-hook-form';

import Button from './Button';
import Form from './Form';
import FormDateInput from './FormDateInput';
import FormMarkdownEditor from './FormMarkdownEditor';
import FormSubmitButton from './FormSubmitButton';
import FormTextInput from './FormTextInput';

function getComponentForInputType(input: Input<any>) {
  const key = input.name as string;
  switch (input.type) {
    case 'text': {
      return (
        <div className="mt-6" key={key}>
          <FormTextInput
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
            <FormMarkdownEditor name={key} />
          </div>
        </div>
      );
    }
    case 'date': {
      return (
        <div className="mt-6" key={key}>
          <FormDateInput
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
  initialData: TFieldValues;
  inputs: Input<TFieldValues>[];
}

function FormBuilder<FormStructure extends Record<string, any>>(
  props: FormBuilderProps<FormStructure>
) {
  const { onSubmit, onCancel, initialData, inputs } = props;

  return (
    <Form
      defaultValues={initialData as Record<string, any>}
      onSubmit={onSubmit}
    >
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
