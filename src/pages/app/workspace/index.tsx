import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';
import {
  SnackbarSeverity,
  useSnackbar,
} from '../../../components/common/Snackbar';
import Form from '../../../components/Form';
import FormSubmitButton from '../../../components/FormSubmitButton';
import FormTextInput from '../../../components/FormTextInput';
import { CreateWorkspaceSchema } from '../../../schemas/WorkspaceSchemas';
import WorkspaceService from '../../../services/WorkspaceService';

const Workspace = () => {
  const snackbar = useSnackbar();

  return (
    <>
      <h1 className="mb-4">Add Workspace</h1>
      <Form
        onSubmit={async (data) => {
          WorkspaceService.createWorkspace(data)
            .then(() => {
              snackbar.displaySnackbar({
                message: 'Successfully added workspace!',
                severity: SnackbarSeverity.SUCCESS,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }}
        defaultValues={{
          name: '',
          tag: '',
        }}
        resolver={zodResolver(CreateWorkspaceSchema)}
      >
        {({ keys }) => (
          <div className="flex flex-col">
            <div className="mb-8">
              <FormTextInput label="Name" name={keys.name} required />
            </div>
            <div className="mb-8">
              <FormTextInput label="Tag" name={keys.tag} required />
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
