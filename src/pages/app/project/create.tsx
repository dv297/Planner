import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';
import Form from '../../../components/common/Form';
import FormMarkdownEditor from '../../../components/common/FormMarkdownEditor';
import FormSubmitButton from '../../../components/common/FormSubmitButton';
import FormTextInput from '../../../components/common/FormTextInput';

const CreateProjectPage = () => {
  return (
    <>
      <h1 className="text-lg font-bold text-slate-800">Create a Project</h1>
      <div className="mt-4">
        <Form
          defaultValues={{ title: '', description: '' }}
          onSubmit={(data) => {
            console.log(data);
          }}
        >
          {({ keys }) => {
            return (
              <div className="flex flex-col w-full">
                <div>
                  <FormTextInput label="Title" name={keys.title} />
                </div>
                <div className="mt-6">
                  <label className="font-medium">Description</label>
                  <div className="mt-2">
                    <FormMarkdownEditor name={keys.description} />
                  </div>
                </div>
                <div className="mt-4">
                  <FormSubmitButton label="Submit" />
                </div>
              </div>
            );
          }}
        </Form>
      </div>
    </>
  );
};

CreateProjectPage.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default CreateProjectPage;
