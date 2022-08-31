import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { ReactNode, useState } from 'react';

import { AppContextProvider } from './AppContext';
import DashboardBodyLayout from './DashboardBodyLayout';
import FullScreenLoader from './FullScreenLoader';
import Sidebar from './Sidebar';

interface AppDefaultLayoutProps {
  children: ReactNode;
}

const AppDefaultLayout = (props: AppDefaultLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/');
    },
  });

  if (status !== 'authenticated') {
    return <FullScreenLoader />;
  }

  return (
    <AppContextProvider>
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <DashboardBodyLayout setSidebarOpen={setSidebarOpen}>
          {props.children}
        </DashboardBodyLayout>
      </div>
    </AppContextProvider>
  );
};

export default AppDefaultLayout;
