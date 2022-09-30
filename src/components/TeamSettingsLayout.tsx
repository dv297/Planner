import { ReactNode, useState } from 'react';
import { UserGroupIcon } from '@heroicons/react/outline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { AppContextProvider } from '@src/components/AppContext';
import FullScreenLoader from '@src/components/common/FullScreenLoader';
import { SnackbarProvider } from '@src/components/common/Snackbar';
import DashboardBodyLayout from '@src/components/DashboardBodyLayout';
import Sidebar, { NavigationElement } from '@src/components/Sidebar';

interface TeamSettingsLayoutProps {
  children: ReactNode;
}

const TeamSettingsLayout = (props: TeamSettingsLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { replace, asPath } = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      replace('/');
    },
  });

  if (status !== 'authenticated') {
    return <FullScreenLoader />;
  }

  const navigation: NavigationElement[] = [
    {
      name: 'Members',
      href: '/app/team-settings/members',
      icon: UserGroupIcon,
      current: asPath.includes('/app/team-settings/members'),
    },
  ];

  return (
    <SnackbarProvider>
      <AppContextProvider>
        <div>
          <Sidebar
            header={
              <Link href="/app/dashboard">
                <div className="flex flex-row items-center">
                  <div className="text-white">
                    <ArrowBackIcon />
                  </div>
                  <span className="ml-2 text-white font-bold text-md">
                    Back
                  </span>
                </div>
              </Link>
            }
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            navigation={navigation}
          />
          <DashboardBodyLayout setSidebarOpen={setSidebarOpen}>
            {props.children}
          </DashboardBodyLayout>
        </div>
      </AppContextProvider>
    </SnackbarProvider>
  );
};

export default TeamSettingsLayout;
