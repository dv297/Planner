// TODO: Remove ESlint disable
/* eslint-disable @next/next/no-img-element */

import { Fragment, ReactNode } from 'react';
import { Popover, Transition } from '@headlessui/react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import clsx from 'clsx';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';

const resources = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Github', href: 'https://github.com/dv297/planner' },
];

interface LandingPageLayoutProps {
  children: ReactNode;
}

const LandingPageLayout = (props: LandingPageLayoutProps) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Planner</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="relative">
        <nav>
          <Popover className="relative bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <Link href="/">
                    <>
                      <span className="sr-only">Planner</span>
                      <Image
                        className="w-auto"
                        src="/images/logo/logo-no-background.svg"
                        alt="Planner"
                        height="24"
                        width="150"
                      />
                    </>
                  </Link>
                </div>
                <div className="-my-2 -mr-2 md:hidden">
                  <Popover.Button
                    className={clsx(
                      'inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                    )}
                  >
                    <span className="sr-only">Open menu</span>
                    <div className="h-6 w-6" aria-hidden="true">
                      <MenuIcon />
                    </div>
                  </Popover.Button>
                </div>
                <div className="hidden space-x-10 md:flex">
                  {resources.map((resource, index) => (
                    <Link key={index} href={resource.href} passHref>
                      <a className="text-base font-medium text-gray-500 hover:text-gray-900 cursor-pointer">
                        {resource.name}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
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
                    className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>

            <Transition
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
              >
                <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="px-5 pt-5 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="h-full flex items-center">
                        <Image
                          className="w-auto"
                          src="/images/logo/logo-no-background.svg"
                          alt="Planner"
                          height="24"
                          width="150"
                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close menu</span>
                          <div className="h-6 w-6" aria-hidden="true">
                            <CloseIcon />
                          </div>
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 py-6 px-5">
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                      {resources.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="text-base font-medium text-gray-900 hover:text-gray-700"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div>
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
                        className={clsx(
                          'flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm cursor-pointer',
                          'bg-accent-blue-500 hover:bg-accent-blue-700'
                        )}
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </nav>

        <main className="lg:relative min-h-screen">{props.children}</main>
      </div>
    </>
  );
};

export default LandingPageLayout;
