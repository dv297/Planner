import Button from '../../common/Button';
import { useOnboardingMachine } from '../../../machines/onboarding/useOnboardingMachine';

const InitialSetupSelfUserAcknowledgement = () => {
  const { machineSend } = useOnboardingMachine();

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
        <Button onClick={() => machineSend('COMPLETE')}>Next</Button>
      </div>
    </>
  );
};

export default InitialSetupSelfUserAcknowledgement;
