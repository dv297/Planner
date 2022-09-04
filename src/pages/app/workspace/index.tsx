import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';
import Form from '../../../components/common/Form';
import FormSubmitButton from '../../../components/common/FormSubmitButton';
import FormTextInput from '../../../components/common/FormTextInput';
import {
  SnackbarSeverity,
  useSnackbar,
} from '../../../components/common/Snackbar';
import { CreateWorkspaceSchema } from '../../../schemas/WorkspaceSchemas';
import QueryKeys from '../../../services/QueryKeys';
import WorkspaceService from '../../../services/WorkspaceService';

const Workspace = () => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

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
              queryClient.invalidateQueries([QueryKeys.WORKSPACES]);
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
              <FormTextInput label="Name" name={keys.name} required id="name" />
            </div>
            <div className="mb-8">
              <FormTextInput label="Tag" name={keys.tag} required id="tag" />
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
