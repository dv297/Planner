import { useMutation, useQuery } from '@tanstack/react-query';

import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import PersonalInformationForm from '@src/components/PersonalInformationForm';
import { useOnboardingMachine } from '@src/machines/onboarding/useOnboardingMachine';
import OnboardingService from '@src/services/OnboardingService';
import SettingsService from '@src/services/SettingsService';

const InitialSetupEstablishIndividualSettings = () => {
  const { machineSend } = useOnboardingMachine();
  const { displaySnackbar } = useSnackbar();

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

  const createDefaultWorkspaceAndTeamMutation = useMutation(
    ['create-default-workspace-and-team'],
    OnboardingService.createDefaultWorkspaceAndTeam
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
        initialData={data}
        onSubmit={async (data) => {
          await mutation.mutate(data);
          await createDefaultWorkspaceAndTeamMutation.mutate();
          machineSend('COMPLETE');
          displaySnackbar({
            severity: SnackbarSeverity.SUCCESS,
            message: 'Saved settings!',
          });
        }}
      />
    </>
  );
};

export default InitialSetupEstablishIndividualSettings;
