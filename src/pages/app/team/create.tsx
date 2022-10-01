import { ReactNode } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import FormBuilder from '@src/components/common/FormBuilder';
import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import QueryKeys from '@src/services/QueryKeys';
import TeamsService from '@src/services/TeamsService';

const Page = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation([], TeamsService.createTeamForUser, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.TEAMS]);
      router.push('/app/dashboard');
    },
  });

  const snackbar = useSnackbar();

  return (
    <div>
      <h1 className="font-bold text-lg">Create Team</h1>
      <FormBuilder
        onSubmit={async (data) => {
          await mutation.mutate(data);
          snackbar.displaySnackbar({
            message: 'Successfully created a new team!',
            severity: SnackbarSeverity.SUCCESS,
          });
        }}
        initialData={{ name: '' }}
        inputs={[
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            isRequired: true,
          },
        ]}
      />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Page;
