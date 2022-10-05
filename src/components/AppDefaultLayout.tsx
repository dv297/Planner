import { ReactNode, useState } from 'react';
import { FolderIcon, HomeIcon } from '@heroicons/react/outline';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
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
      current: asPath.includes('/app/projects'),
    },
    {
      name: 'Sprints',
      href: '/app/sprints/{WORKSPACE_TAG}',
      icon: TimelineOutlinedIcon,
      current: asPath.includes('/app/sprints'),
    },
  ];

  return (
    <AppContextProvider>
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
