import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { ReactNode, useState } from 'react';

import { AppContextProvider } from './AppContext';
import FullScreenLoader from './common/FullScreenLoader';
import { SnackbarProvider } from './common/Snackbar';
import DashboardBodyLayout from './DashboardBodyLayout';
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
    <SnackbarProvider>
      <AppContextProvider>
        <div>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <DashboardBodyLayout setSidebarOpen={setSidebarOpen}>
            {props.children}
          </DashboardBodyLayout>
        </div>
      </AppContextProvider>
    </SnackbarProvider>
  );
};

export default AppDefaultLayout;
