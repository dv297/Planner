import { ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import Form from '@src/components/common/Form';
import FormSubmitButton from '@src/components/common/FormSubmitButton';
import FormTextInput from '@src/components/common/FormTextInput';
import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import ConstrainDashboardContainer from '@src/components/ConstrainDashboardContainer';
import { CreateWorkspaceSchema } from '@src/schemas/WorkspaceSchemas';
import QueryKeys from '@src/services/QueryKeys';
import UserPreferencesService from '@src/services/UserPreferencesService';
import WorkspaceService from '@src/services/WorkspaceService';

const Workspace = () => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const router = useRouter();

  const userPreferencesMutation = useMutation(
    [QueryKeys.USER_PREFERENCES],
    UserPreferencesService.update,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([QueryKeys.USER_PREFERENCES]);
        snackbar.displaySnackbar({
          message: `Changing workspace`,
          severity: SnackbarSeverity.SUCCESS,
        });
        router.push('/app/dashboard');
      },
    }
  );

  return (
    <>
      <h1 className="font-bold text-lg mb-4">Add Workspace</h1>
      <Form
        onSubmit={async (data) => {
          WorkspaceService.createWorkspace(data)
            .then(async (workspaceId) => {
              snackbar.displaySnackbar({
                message: 'Successfully added workspace!',
                severity: SnackbarSeverity.SUCCESS,
              });
              queryClient.invalidateQueries([QueryKeys.WORKSPACES]);
              await userPreferencesMutation.mutate([
                {
                  field: 'workspaceId',
                  value: workspaceId,
                },
              ]);
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
  return (
    <AppDefaultLayout>
      <Head>
        <title>Planner - Create Workspace</title>
      </Head>
      <ConstrainDashboardContainer>{page}</ConstrainDashboardContainer>
    </AppDefaultLayout>
  );
};

export default Workspace;
