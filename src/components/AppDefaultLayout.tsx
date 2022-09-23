import { CalendarIcon, FolderIcon, HomeIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { ReactNode, useState } from 'react';

import { AppContextProvider } from './AppContext';
import FullScreenLoader from './common/FullScreenLoader';
import { SnackbarProvider } from './common/Snackbar';
import DashboardBodyLayout from './DashboardBodyLayout';
import Sidebar, { NavigationElement } from './Sidebar';
import WorkspaceSelector from './WorkspaceSelector';

interface AppDefaultLayoutProps {
  children: ReactNode;
}

const AppDefaultLayout = (props: AppDefaultLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const { asPath } = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/');
    },
  });

  if (status !== 'authenticated') {
    return <FullScreenLoader />;
  }

  const navigation: NavigationElement[] = [
    {
      name: 'Dashboard',
      href: '/app/dashboard/{WORKSPACE_TAG}',
      icon: HomeIcon,
      current: asPath.includes('/app/dashboard'),
    },
    {
      name: 'Projects',
      href: '/app/projects/{WORKSPACE_TAG}',
      icon: FolderIcon,
      current: asPath.includes('/app/projects'),
    },
  ];

  return (
    <SnackbarProvider>
      <AppContextProvider>
        <div>
          <Sidebar
            header={
              <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
                <WorkspaceSelector />
              </div>
            }
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            navigation={navigation}
          />
          <DashboardBodyLayout setSidebarOpen={setSidebarOpen} includeSearch>
            {props.children}
          </DashboardBodyLayout>
        </div>
      </AppContextProvider>
    </SnackbarProvider>
  );
};

export default AppDefaultLayout;
