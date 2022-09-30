import { useMutation } from '@tanstack/react-query';

import Button from '@src/components/common/Button';
import { useOnboardingMachine } from '@src/machines/onboarding/useOnboardingMachine';
import OnboardingService from '@src/services/OnboardingService';

const InitialSetupSelfUserAcknowledgement = () => {
  const { machineSend } = useOnboardingMachine();
  const mutation = useMutation(
    ['create-default-workspace-and-team'],
    OnboardingService.createDefaultWorkspaceAndTeam
  );

  const onNextClick = async () => {
    await mutation.mutate();
    machineSend('COMPLETE');
  };

  return (
    <>
      <p className="text-xl leading-8 text-slate-800">
        Great! We will set you up with some default values for the project name
        and skip the team invitation step. You can always change these settings
        later.
      </p>
      <p className="mt-8 text-xl text-slate-800">
        Let us just gather some personal information and we will be done!
      </p>
      <div className="mt-6">
        <Button onClick={onNextClick}>Next</Button>
      </div>
    </>
  );
};

export default InitialSetupSelfUserAcknowledgement;
