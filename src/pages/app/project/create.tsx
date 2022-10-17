import { ReactNode } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useAppContext } from '@src/components/AppContext';
import AppDefaultLayout from '@src/components/AppDefaultLayout';
import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import ConstrainDashboardContainer from '@src/components/ConstrainDashboardContainer';
import CreateIssueForm from '@src/components/CreateIssueForm';
import ProjectsService from '@src/services/ProjectsService';
import QueryKeys from '@src/services/QueryKeys';

const CreateProjectPage = () => {
  const appContext = useAppContext();
  const router = useRouter();
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    [QueryKeys.PROJECTS],
    ProjectsService.createProject,
    {
      onSuccess: () => {
        snackbar.displaySnackbar({
          message:
            'Sucessfully created project! Taking you back to the project page',
          severity: SnackbarSeverity.SUCCESS,
        });
        queryClient.invalidateQueries([QueryKeys.PROJECTS]);

        router.push('/app/projects');
      },
    }
  );

  return (
    <>
      <h1 className="text-lg font-bold">Create a Project</h1>
      <div className="mt-4">
        <CreateIssueForm
          onSubmit={async (data) => {
            await mutation.mutate({
              ...data,
              workspaceId: appContext.selectedWorkspace.id,
            });
          }}
        />
      </div>
    </>
  );
};

CreateProjectPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <AppDefaultLayout>
      <Head>
        <title>Planner - Create Project</title>
      </Head>
      <ConstrainDashboardContainer>{page}</ConstrainDashboardContainer>
    </AppDefaultLayout>
  );
};

export default CreateProjectPage;
