import { useMutation, useQuery } from '@tanstack/react-query';

import { useOnboardingMachine } from '../../../machines/onboarding/useOnboardingMachine';
import SettingsService from '../../../services/SettingsService';
import PersonalInformationForm from '../../PersonalInformationForm';

const InitialSetupEstablishIndividualSettings = () => {
  const { machineSend } = useOnboardingMachine();

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
      <p className="text-lg leading-8 text-slate-800">
        We gather this information so we know how you want to be addressed. This
        information is only used within this site and is not given to any
        third-parties.
      </p>
      <PersonalInformationForm
        initialData={{ name: data.name, email: data.email }}
        onSubmit={async (data) => {
          await mutation.mutate(data);
          machineSend('COMPLETE');
        }}
      />
    </>
  );
};

export default InitialSetupEstablishIndividualSettings;
