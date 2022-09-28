import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';
import {
  SnackbarSeverity,
  useSnackbar,
} from '../../../components/common/Snackbar';
import PersonalInformationForm from '../../../components/PersonalInformationForm';
import QueryKeys from '../../../services/QueryKeys';
import SettingsService from '../../../services/SettingsService';

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
