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
    <div className="h-screen bg-gray-200">
      <nav className="h-16 py-2 px-9 flex flex-row items-center bg-gray-800 text-gray-200 text-lg font-bold">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-8 w-8"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
              alt="Workflow"
            />
          </div>
        </div>
      </nav>
      <div className="h-12 px-9 bg-white flex flex-row items-center shadow-sm">
        <h1 className="font-thinner text-xl text-gray-500">Account Setup</h1>
      </div>

      <main className="py-8 px-9">
        {machineState.matches('initial') && <InitialSetupPathSelectorPage />}
        {machineState.matches('selfUser') && (
          <InitialSetupSelfUserAcknowledgement />
        )}
        {machineState.matches('establishIndividualSettings') && (
          <InitialSetupEstablishIndividualSettings />
        )}
        {machineState.matches('success') && <InitialSetupSuccess />}
      </main>
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

export default Wrapper;
