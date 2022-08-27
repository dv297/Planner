import AppDefaultLayout from '../../../src/components/AppDefaultLayout';
import PersonalInformationForm from './PersonalInformationForm';
import SettingsService from '../../../src/services/SettingsService';
import { useQuery } from '@tanstack/react-query';

interface SettingsProps {}

const Settings = (props: SettingsProps) => {
  const { data, isLoading, error } = useQuery(
    ['personal-information'],
    SettingsService.getPersonalInformation
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
          SettingsService.updatePersonalInformation(data).catch(console.log);
        }}
      />
    </>
  );
};

Settings.getLayout = function getLayout(page) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Settings;
