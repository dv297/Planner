import { BellIcon, MenuAlt2Icon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import LinearProgress from '@mui/material/LinearProgress';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { ReactNode } from 'react';

import ProfileIconButton from './ProfileIconButton';

interface DashboardBodyLayoutProps {
  children: ReactNode;
  setSidebarOpen: (updatedState: boolean) => void;
}

const DashboardBodyLayout = (props: DashboardBodyLayoutProps) => {
  const { setSidebarOpen } = props;
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return (
    <>
      <div className="md:pl-64 flex flex-col">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <form
                className="w-full flex md:ml-0"
                action="src/components/DashboardBodyLayout#"
                method="GET"
              >
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <ProfileIconButton />
            </div>
          </div>
        </div>

        <main className="flex-1 h-full">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {props.children}
            </div>
          </div>
          {isFetching || isMutating ? (
            <div className="absolute bottom-0 left-0 right-0">
              <LinearProgress />
            </div>
          ) : null}
        </main>
      </div>
    </>
  );
};

export default DashboardBodyLayout;
