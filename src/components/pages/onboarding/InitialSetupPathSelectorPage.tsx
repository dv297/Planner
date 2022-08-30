import { useOnboardingMachine } from '../../../machines/onboarding/useOnboardingMachine';

interface InitialSetupProps {}

interface LargeSetupButtonProps {
  title: string;
  description: string;
  onClick: () => {};
}

const LargeSetupButton = ({
  title,
  description,
  onClick,
}: LargeSetupButtonProps) => {
  return (
    <div className="flex flex-row justify-center">
      <button
        className="h-64 w-64 py-12 px-6 bg-white rounded-3xl border-blue-300 border-solid border-2 hover:border-blue-700 flex flex-col items-center shadow-gray-400 shadow-sm"
        onClick={onClick}
      >
        <span className="text-xl font-medium text-slate-900">{title}</span>
        <span className="text-base leading-2 font-medium text-gray-500 mt-4">
          {description}
        </span>
      </button>
    </div>
  );
};

const InitialSetupPathSelectorPage = (props: InitialSetupProps) => {
  const { machineState, machineSend } = useOnboardingMachine();

  return (
    <>
      <p className="text-3xl font-medium text-slate-700">
        Are you starting to use Planner by yourself or with a team?
      </p>

      <div className="grid grid-cols-2 grid-rows-1 w-full mt-12">
        <LargeSetupButton
          title="By Myself"
          description="Get started with little setup"
          onClick={() => machineSend('DECLARE_SELF_USER')}
        />
        <LargeSetupButton
          title="With a Team"
          description="Get started by establishing team settings and inviting team members"
          onClick={() => machineSend('DECLARE_TEAM_USER')}
        />
      </div>
    </>
  );
};

export default InitialSetupPathSelectorPage;
