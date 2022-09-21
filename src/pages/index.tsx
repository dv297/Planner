import Image from 'next/image';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';
import { ReactNode } from 'react';

import LandingPageLayout from '../components/LandingPageLayout';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="lg:relative">
      <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
        <div className="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <p className="block">Ditch your to-do list</p>{' '}
            <p className="block text-indigo-600">Map your moves</p>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            With all the moving parts and dependencies, to-do lists don&apos;t
            convey the right story. With Planner, you can always see what&apos;s
            up next for you and your team.
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <button
                onClick={async () => {
                  const hasSession = await getSession();

                  if (hasSession) {
                    await router.push('/app/dashboard');
                  } else {
                    await signIn(undefined, {
                      callbackUrl: '/app/dashboard',
                    });
                  }
                }}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
        <Image
          className="absolute inset-0 h-full w-full object-contain"
          src="/images/map-demo.png"
          alt="Screenshot of the application"
          layout="fill"
        />
      </div>
    </div>
  );
}

HomePage.getLayout = (page: ReactNode) => {
  return <LandingPageLayout>{page}</LandingPageLayout>;
};
