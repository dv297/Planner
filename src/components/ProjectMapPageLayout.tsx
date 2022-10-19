import { Fragment, ReactNode, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { AppContextProvider } from '@src/components/AppContext';
import FullScreenLoader from '@src/components/common/FullScreenLoader';
import DashboardBodyLayout from '@src/components/DashboardBodyLayout';
import ProfileIconButton from '@src/components/ProfileIconButton';
import {
  MuiWrapper,
  ThemeSwitcher,
} from '@src/components/ThemeSwitcherContext';
import ThemeSwitcherProvider from '@src/components/ThemeSwitcherContext';

interface ProjectMapPageLayoutProps {
  children: ReactNode;
}

const ProjectMapPageLayout = (props: ProjectMapPageLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/');
    },
  });

  const countOfFetches = useIsFetching();
  const countOfMutations = useIsMutating();
  const isLoading = countOfMutations + countOfFetches !== 0;

  if (status !== 'authenticated') {
    return <FullScreenLoader />;
  }

  return (
    <ThemeSwitcherProvider>
      <MuiWrapper>
        <AppContextProvider>
          <Head>
            <title>Planner</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-40 md:hidden"
                onClose={setSidebarOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  {/* Shodow box for sidebar*/}
                  <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </Transition.Child>

                <div className="fixed inset-0 flex z-40">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pb-4 bg-sidebar">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                          <button
                            type="button"
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setSidebarOpen(false)}
                          >
                            <span className="sr-only">Close sidebar</span>
                            <XIcon
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </Transition.Child>
                      <div className="flex-shrink-0 flex items-center px-4 bg-sidebar-feature py-4">
                        <Link href="/app/dashboard" passHref>
                          <a className="flex flex-row items-center">
                            <div>
                              <ArrowBackIcon />
                            </div>
                            <span className="ml-2 font-bold text-md">
                              Back to Dashboard
                            </span>
                          </a>
                        </Link>{' '}
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                  <div className="flex-shrink-0 w-14" aria-hidden="true">
                    {/* Dummy element to force sidebar to shrink to fit close icon */}
                  </div>
                </div>
              </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
              <div className="flex-1 flex flex-col min-h-0 bg-sidebar border-r border-gray-200 dark:border-gray-700">
                <div className="flex-1 flex flex-col overflow-y-auto h-full">
                  <div className="flex items-center h-16 flex-shrink-0 px-4 sidebar-feature border-solid border-b border-gray-200 dark:border-gray-700">
                    <div className="cursor-pointer">
                      <Link href="/app/dashboard" passHref>
                        <a className="flex flex-row items-center">
                          <div>
                            <ArrowBackIcon />
                          </div>
                          <span className="ml-2 font-bold text-md">Back</span>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <nav
                    className="flex-1 px-2 py-4 space-y-1"
                    data-testid="app-sidebar"
                  ></nav>
                </div>
              </div>
            </div>
            <DashboardBodyLayout
              sidebarWidth="large"
              setSidebarOpen={setSidebarOpen}
              isLoading={isLoading}
              topRightNav={
                <div className="flex flex-row items-center">
                  <div className="h-6 w-6 mr-2">
                    <ThemeSwitcher />
                  </div>
                  <ProfileIconButton />
                </div>
              }
            >
              {props.children}
            </DashboardBodyLayout>
          </div>
        </AppContextProvider>
      </MuiWrapper>
    </ThemeSwitcherProvider>
  );
};

export default ProjectMapPageLayout;
