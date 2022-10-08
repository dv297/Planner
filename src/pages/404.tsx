import { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import LandingPageLayout from '@src/components/LandingPageLayout';

export default function Page() {
  return (
    <>
      <Head>
        <title>Planner - Not Found</title>
      </Head>
      <div className="min-h-full pt-16 pb-12 flex flex-col">
        <div className="py-16">
          <div className="text-center">
            <h1 className="mt-2 text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">
              Page not found.
            </h1>
            <p className="mt-2 text-base text-gray-500">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-6">
              <Link href="/">
                <a className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                  Go back home<span aria-hidden="true"> &rarr;</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <LandingPageLayout>{page}</LandingPageLayout>;
};
