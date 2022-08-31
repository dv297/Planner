import { useMutation,useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';

import AppDefaultLayout from '../../../src/components/AppDefaultLayout';
import PersonalInformationForm from '../../../src/components/PersonalInformationForm';
import SettingsService from '../../../src/services/SettingsService';

const Settings = () => {
  const { data, isLoading, error } = useQuery(
    ['personal-information'],
    SettingsService.getPersonalInformation,
    {
      refetchOnWindowFocus: false,
    }
  );

  const mutation = useMutation(
    ['personal-information'],
    SettingsService.updatePersonalInformation
  );

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
        initialData={{
          name: data.name,
          email: data.email,
        }}
        onSubmit={(data) => {
          mutation.mutate(data);
        }}
      />
    </>
  );
};

Settings.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Settings;
