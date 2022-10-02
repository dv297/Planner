import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { getProviders, signIn } from 'next-auth/react';
import { ClientSafeProvider } from 'next-auth/react/types';

import LandingPageLayout from '@src/components/LandingPageLayout';
import extractSingle from '@src/utils/extractSingle';

interface SigninProps {
  providers: ClientSafeProvider[];
}

const Signin = (props: SigninProps) => {
  const { providers } = props;
  const router = useRouter();

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="h-80 w-80 bg-white shadow-lg px-12 py-12 rounded-2xl">
          <div className="w-full text-center pb-3">
            <span className="text-xl font-bold text-primary text-center">
              Sign In
            </span>
          </div>
          {providers &&
            Object.values(providers).map((provider) => (
              <div className="mt-4" key={provider.id}>
                <button
                  onClick={() => {
                    signIn(provider.id, {
                      callbackUrl:
                        extractSingle(router.query.callbackUrl) ??
                        '/app/dashboard',
                    });
                  }}
                  className="w-full inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

Signin.getLayout = (page: ReactNode) => {
  return <LandingPageLayout>{page}</LandingPageLayout>;
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default Signin;
