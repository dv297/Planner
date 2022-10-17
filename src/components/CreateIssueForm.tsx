import Button from '@src/components/common/Button';
import Form from '@src/components/common/Form';
import FormMarkdownEditor from '@src/components/common/FormMarkdownEditor';
import FormSubmitButton from '@src/components/common/FormSubmitButton';
import FormTextInput from '@src/components/common/FormTextInput';

interface CreateIssueOutput {
  title: string;
  description: string;
}

interface CreateIssueFormProps {
  onSubmit: (output: CreateIssueOutput) => Promise<void>;
  onCancel?: () => void;
}

const CreateIssueForm = (props: CreateIssueFormProps) => {
  const { onSubmit, onCancel } = props;

  return (
    <Form defaultValues={{ title: '', description: '' }} onSubmit={onSubmit}>
      {({ keys }) => {
        return (
          <div className="flex flex-col w-full">
            <div>
              <FormTextInput label="Title" name={keys.title} id="title" />
            </div>
            <div className="mt-6">
              <label className="font-medium">Description</label>
              <div className="mt-2">
                <FormMarkdownEditor name={keys.description} />
              </div>
            </div>
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
};

export default CreateIssueForm;
