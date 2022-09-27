import Link from 'next/link';
import { ReactNode } from 'react';

import LandingPageLayout from '../../components/LandingPageLayout';

const Logout = () => {
  return (
    <div className="py-32 flex flex-col justify-center items-center">
      <h1 className="mb-6 text-3xl font-bold text-primary">
        Thanks for using Planner!
      </h1>
      <p className="mb-2">You have been signed out.</p>
      <p className="mb-2">
        Use the link below to go back to the home page or feel free to close
        your browser or tab.
      </p>
      <Link href="/">
        <span className="text-2xl font-bold text-primary underline mt-4 cursor-pointer">
          Home
        </span>
      </Link>
    </div>
  );
};

Logout.getLayout = function getLayout(page: ReactNode) {
  return <LandingPageLayout>{page}</LandingPageLayout>;
};

export default Logout;
