interface InitialSetupProps {}

interface LargeSetupButtonProps {
  title: string;
  description: string;
}

const LargeSetupButton = ({ title, description }: LargeSetupButtonProps) => {
  return (
    <div className="flex flex-row justify-center">
      <button className="h-64 w-64 py-12 px-6 bg-white rounded-3xl border-blue-300 border-solid border-2 hover:border-blue-700 flex flex-col items-center shadow-gray-400 shadow-sm">
        <span className="text-xl font-medium text-slate-900">{title}</span>
        <span className="text-base leading-2 font-medium text-gray-500 mt-4">
          {description}
        </span>
      </button>
    </div>
  );
};

const InitialSetup = (props: InitialSetupProps) => {
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
        <p className="text-3xl font-medium text-slate-700">
          Are you starting to use Planner by yourself or with a team?
        </p>

        <div className="grid grid-cols-2 grid-rows-1 w-full mt-12">
          <LargeSetupButton
            title="By Myself"
            description="Get started with little setup"
          />
          <LargeSetupButton
            title="With a Team"
            description="Get started by establishing team settings and inviting team members"
          />
        </div>
      </main>
    </div>
  );
};

export default InitialSetup;
