import { ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import LinearProgress from '@mui/material/LinearProgress';
import clsx from 'clsx';

import SearchBar from '@src/components/pages/search/SearchBar';

interface DashboardBodyLayoutProps {
  children: ReactNode;
  setSidebarOpen: (updatedState: boolean) => void;
  isLoading: boolean;
  topRightNav?: ReactNode;
  sidebarWidth?: 'normal' | 'large';
}

const DashboardBodyLayout = (props: DashboardBodyLayoutProps) => {
  const {
    setSidebarOpen,
    isLoading,
    topRightNav,
    sidebarWidth = 'normal',
  } = props;

  return (
    <div className="theme-background">
      <DndProvider backend={HTML5Backend}>
        <div
          className={clsx('flex flex-col h-screen', {
            'md:pl-56': sidebarWidth === 'normal',
            'md:pl-72': sidebarWidth === 'large',
          })}
        >
          <div className="sticky bg-theme-background top-0 shadow md:shadow-none dark:shadow-none dark:border-b dark:border-gray-700 dark:md:border-b-0 md:relative z-10 flex-shrink-0 flex h-16">
            <button
              type="button"
              className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                <SearchBar />
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                {topRightNav}
              </div>
            </div>
          </div>

          <main className="flex-1 h-full">
            <div className="py-6 h-full">{props.children}</div>
          </main>
        </div>
        {isLoading ? (
          <div className="fixed bottom-0 left-0 right-0">
            <LinearProgress />
          </div>
        ) : null}
      </DndProvider>
    </div>
  );
};

export default DashboardBodyLayout;
