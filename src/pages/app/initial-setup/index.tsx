import { ReactNode } from 'react';

import LandingPageLayout from '@src/components/LandingPageLayout';
import OnboardingLayout from '@src/components/OnboardingLayout';
import InitialSetupEstablishIndividualSettings from '@src/components/pages/onboarding/InitialSetupEstablishIndividualSettings';
import InitialSetupPathSelectorPage from '@src/components/pages/onboarding/InitialSetupPathSelectorPage';
import InitialSetupSelfUserAcknowledgement from '@src/components/pages/onboarding/InitialSetupSelfUserAcknowledgement';
import InitialSetupSuccess from '@src/components/pages/onboarding/InitialSetupSuccess';
import {
  OnboardingMachineProvider,
  useOnboardingMachine,
} from '@src/machines/onboarding/useOnboardingMachine';

const InitialSetup = () => {
  const { machineState } = useOnboardingMachine();

  return (
    <div className="py-8 px-9">
      {machineState.matches('initial') && <InitialSetupPathSelectorPage />}
      {machineState.matches('selfUser') && (
        <InitialSetupSelfUserAcknowledgement />
      )}
      {machineState.matches('establishIndividualSettings') && (
        <InitialSetupEstablishIndividualSettings />
      )}
      {machineState.matches('success') && <InitialSetupSuccess />}
    </div>
  );
};

const Wrapper = () => {
  return (
    <OnboardingMachineProvider>
      <InitialSetup />
    </OnboardingMachineProvider>
  );
};

Wrapper.getLayout = function getLayout(page: ReactNode) {
  return <OnboardingLayout>{page}</OnboardingLayout>;
};

export default Wrapper;
