import { FormEvent, ReactNode } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getProviders, signIn } from 'next-auth/react';
import { ClientSafeProvider } from 'next-auth/react/types';

import LandingPageLayout from '@src/components/LandingPageLayout';
import extractSingle from '@src/utils/extractSingle';

interface FormElements extends HTMLFormControlsCollection {
  usernameInput: HTMLInputElement;
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface SigninProps {
  providers: ClientSafeProvider[];
}

const Signin = (props: SigninProps) => {
  const { providers } = props;
  const router = useRouter();

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="w-80 bg-white shadow-lg px-12 py-12 rounded-2xl">
          <div className="w-full text-center pb-3">
            <span className="text-xl font-bold text-primary text-center">
              Sign In
            </span>
          </div>
          {providers &&
            Object.values(providers)
              .filter((provider) => {
                return provider.type !== 'credentials';
              })
              .map((provider) => (
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
          {process.env.NODE_ENV !== 'production' && (
            <div className="pt-4 border-top border-solid border-gray-300">
              <form
                onSubmit={(event: FormEvent<UsernameFormElement>) => {
                  event.preventDefault();
                  signIn('credentials', {
                    email: event.currentTarget.elements.usernameInput.value,
                    password: '',
                    callbackUrl: '/app/dashboard',
                  });
                }}
              >
                <label>
                  Username
                  <input
                    id="usernameInput"
                    name="username"
                    type="text"
                    className="mt-2 outline outline-gray-300 rounded-md w-full pl-2"
                  />
                </label>
                <button
                  className="mt-6 py-1 w-full bg-blue-500 text-white rounded-md hover:outline hover:outline-blue-700 hover:shadow"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Signin.getLayout = (page: ReactNode) => {
  return <LandingPageLayout>{page}</LandingPageLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default Signin;
