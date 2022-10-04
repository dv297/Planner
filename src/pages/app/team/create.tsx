import { ReactNode } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import FormBuilder from '@src/components/common/FormBuilder';
import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import ConstrainDashboardContainer from '@src/components/ConstrainDashboardContainer';
import QueryKeys from '@src/services/QueryKeys';
import TeamsService from '@src/services/TeamsService';
import UserPreferencesService from '@src/services/UserPreferencesService';

const Page = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const snackbar = useSnackbar();

  const mutation = useMutation([], TeamsService.createTeamForUser, {
    onSuccess: async (createdTeam) => {
      queryClient.invalidateQueries([QueryKeys.TEAMS]);

      await setUserPreferenceMutation.mutate([
        {
          field: 'teamId',
          value: createdTeam.id,
        },
      ]);
    },
  });

  const setUserPreferenceMutation = useMutation(
    [QueryKeys.USER_PREFERENCES],
    UserPreferencesService.update,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.USER_PREFERENCES]);

        snackbar.displaySnackbar({
          message:
            'Successfully created a new team! Switching you to their workspace.',
          severity: SnackbarSeverity.SUCCESS,
        });

        setTimeout(() => {
          router.push('/app/dashboard');
        }, 500);
      },
    }
  );

  return (
    <div>
      <h1 className="font-bold text-lg">Create Team</h1>
      <FormBuilder
        onSubmit={async (data) => {
          await mutation.mutate(data);
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
  return (
    <AppDefaultLayout>
      <ConstrainDashboardContainer>{page}</ConstrainDashboardContainer>
    </AppDefaultLayout>
  );
};

export default Page;
