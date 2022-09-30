import { ReactNode } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import AppDefaultLayout from '@src/components/AppDefaultLayout';
import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import PersonalInformationForm from '@src/components/PersonalInformationForm';
import QueryKeys from '@src/services/QueryKeys';
import SettingsService from '@src/services/SettingsService';

const Settings = () => {
  const { data, isLoading, error } = useQuery(
    ['personal-information'],
    SettingsService.getPersonalInformation,
    {
      refetchOnWindowFocus: false,
    }
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    ['personal-information'],
    SettingsService.updatePersonalInformation
  );

  const { displaySnackbar } = useSnackbar();

  if (error) {
    return <div>Error loading personal information</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <PersonalInformationForm
        initialData={data}
        onSubmit={async (data) => {
          await mutation.mutate(data);
          displaySnackbar({
            severity: SnackbarSeverity.SUCCESS,
            message: 'Saved settings!',
          });

          await queryClient.invalidateQueries([QueryKeys.PERSONAL_INFORMATION]);
        }}
      />
    </>
  );
};

Settings.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Settings;
