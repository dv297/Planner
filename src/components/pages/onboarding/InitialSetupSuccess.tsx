import { useRouter } from 'next/router';

import Button from '../../common/Button';

const InitialSetupSuccess = () => {
  const router = useRouter();

  return (
    <>
      <p className="text-lg text-slate-800 mt-8">You are all set up!</p>
      <p className="text-lg text-slate-800 mt-8">
        Click below to be taken to the main application.
      </p>
      <div className="mt-8">
        <Button onClick={() => router.replace('/app/dashboard')}>Next</Button>
      </div>
    </>
  );
};

export default InitialSetupSuccess;
