import AppDefaultLayout from '../../../src/components/AppDefaultLayout';
import PersonalInformationForm from './PersonalInformationForm';
import SettingsService from '../../../src/services/SettingsService';
import { useQuery, useMutation } from '@tanstack/react-query';

interface SettingsProps {}

const Settings = (props: SettingsProps) => {
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

Settings.getLayout = function getLayout(page) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Settings;
