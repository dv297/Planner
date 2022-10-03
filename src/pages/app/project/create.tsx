import { ReactNode } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useAppContext } from '@src/components/AppContext';
import AppDefaultLayout from '@src/components/AppDefaultLayout';
import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import CreateIssueForm from '@src/components/CreateIssueForm';
import ProjectsService from '@src/services/ProjectsService';
import QueryKeys from '@src/services/QueryKeys';

const CreateProjectPage = () => {
  const appContext = useAppContext();
  const router = useRouter();
  const snackbar = useSnackbar();

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

        setTimeout(() => {
          router.push('/app/projects');
        }, 500);
      },
    }
  );

  return (
    <>
      <h1 className="text-lg font-bold text-slate-800">Create a Project</h1>
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
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default CreateProjectPage;
