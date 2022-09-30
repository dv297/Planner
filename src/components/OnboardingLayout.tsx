// TODO: Remove ESlint disable
/* eslint-disable @next/next/no-img-element */

import { Fragment, ReactNode } from 'react';
import { Popover, Transition } from '@headlessui/react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';

interface LandingPageLayoutProps {
  children: ReactNode;
}

const LandingPageLayout = (props: LandingPageLayoutProps) => {
  const router = useRouter();

  return (
    <div className="relative bg-gray-50">
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
                    alt=""
                    height="24"
                    width="150"
                  />
                </>
              </Link>
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
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
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
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      <main className="lg:relative min-h-screen">{props.children}</main>
    </div>
  );
};

export default LandingPageLayout;
