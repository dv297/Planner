import { ReactNode } from 'react';
import Head from 'next/head';

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
    <>
      {machineState.matches('initial') && <InitialSetupPathSelectorPage />}
      {machineState.matches('selfUser') && (
        <InitialSetupSelfUserAcknowledgement />
      )}
      {machineState.matches('establishIndividualSettings') && (
        <InitialSetupEstablishIndividualSettings />
      )}
      {machineState.matches('success') && <InitialSetupSuccess />}
    </>
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
  return (
    <OnboardingLayout>
      <Head>
        <title>Planner - Initial Setup</title>
      </Head>
      {page}
    </OnboardingLayout>
  );
};

export default Wrapper;
