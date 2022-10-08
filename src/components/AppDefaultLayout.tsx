import { ReactNode, useState } from 'react';
import {
  ClipboardCheckIcon,
  FolderIcon,
  HomeIcon,
  TrendingDownIcon,
} from '@heroicons/react/outline';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { AppContextProvider } from '@src/components/AppContext';
import FullScreenLoader from '@src/components/common/FullScreenLoader';
import DashboardBodyLayout from '@src/components/DashboardBodyLayout';
import Sidebar, { NavigationElement } from '@src/components/Sidebar';
import WorkspaceSelector from '@src/components/WorkspaceSelector';

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
      href: '/app/dashboard',
      icon: HomeIcon,
      current: asPath.includes('/app/dashboard'),
    },
    {
      name: 'Projects',
      href: '/app/projects/{WORKSPACE_TAG}',
      icon: FolderIcon,
      current:
        asPath.includes('/app/projects') ||
        asPath.includes('/app/project') ||
        asPath.includes('/app/issue'),
    },
    {
      name: 'Sprints',
      href: '/app/sprints/{WORKSPACE_TAG}',
      icon: TrendingDownIcon,
      current: asPath.includes('/app/sprints'),
    },
    {
      name: 'Board',
      href: '/app/board/{WORKSPACE_TAG}',
      icon: ClipboardCheckIcon,
      current: asPath.includes('/app/board'),
    },
  ];

  return (
    <AppContextProvider>
      <Head>
        <title>Planner</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <Sidebar
          header={<WorkspaceSelector />}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={navigation}
        />
        <DashboardBodyLayout setSidebarOpen={setSidebarOpen}>
          {props.children}
        </DashboardBodyLayout>
      </div>
    </AppContextProvider>
  );
};

export default AppDefaultLayout;
