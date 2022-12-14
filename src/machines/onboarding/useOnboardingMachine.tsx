import { createContext, ReactNode, useContext } from 'react';
import { useActor, useInterpret } from '@xstate/react';
import { InterpreterFrom } from 'xstate';

import onboardingMachine from '@src/machines/onboarding/onboardingMachine';

const OnboardingMachineContext = createContext(
  {} as InterpreterFrom<typeof onboardingMachine>
);

interface OnboardingMachineProviderProps {
  children: ReactNode;
}

const OnboardingMachineProvider = (props: OnboardingMachineProviderProps) => {
  const onboardingMachineService = useInterpret(onboardingMachine);

  return (
    <OnboardingMachineContext.Provider value={onboardingMachineService}>
      {props.children}
    </OnboardingMachineContext.Provider>
  );
};

const useOnboardingMachine = () => {
  const onboardingService = useContext(OnboardingMachineContext);
  const [machineState, machineSend] = useActor(onboardingService);

  return {
    machineState,
    machineSend,
  };
};

export { OnboardingMachineProvider, useOnboardingMachine };
