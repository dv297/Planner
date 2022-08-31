import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';
import Form from '../../../components/Form';
import FormSubmitButton from '../../../components/FormSubmitButton';
import FormTextInput from '../../../components/FormTextInput';
import WorkspaceService from '../../../services/WorkspaceService';

const Workspace = () => {
  return (
    <>
      <h1 className="mb-4">Add Workspace</h1>
      <Form
        onSubmit={async (data) => {
          WorkspaceService.createWorkspace(data).catch((err) => {
            console.log(err);
          });
        }}
        defaultValues={{
          name: '',
          tag: '',
        }}
      >
        {({ keys }) => (
          <div className="flex flex-col">
            <div className="mb-8">
              <FormTextInput label="Name" name={keys.name} />
            </div>
            <div className="mb-8">
              <FormTextInput label="Tag" name={keys.tag} />
            </div>
            <FormSubmitButton label="Submit" />
          </div>
        )}
      </Form>
    </>
  );
};

Workspace.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Workspace;