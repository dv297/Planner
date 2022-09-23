import { AdjustmentsIcon, UserGroupIcon } from '@heroicons/react/outline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { ReactNode, useState } from 'react';

import { AppContextProvider } from './AppContext';
import FullScreenLoader from './common/FullScreenLoader';
import { SnackbarProvider } from './common/Snackbar';
import DashboardBodyLayout from './DashboardBodyLayout';
import Sidebar, { NavigationElement } from './Sidebar';

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
              <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
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
              </div>
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
