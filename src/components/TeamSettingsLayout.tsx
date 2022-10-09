import { ReactNode, useState } from 'react';
import { UserGroupIcon } from '@heroicons/react/outline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { AppContextProvider } from '@src/components/AppContext';
import FullScreenLoader from '@src/components/common/FullScreenLoader';
import { SnackbarProvider } from '@src/components/common/Snackbar';
import DashboardBodyLayout from '@src/components/DashboardBodyLayout';
import ProfileIconButton from '@src/components/ProfileIconButton';
import Sidebar, { NavigationElement } from '@src/components/Sidebar';

interface TeamSettingsLayoutProps {
  children: ReactNode;
}

const TeamSettingsLayout = (props: TeamSettingsLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { replace, asPath } = useRouter();

  const countOfFetches = useIsFetching();
  const countOfMutations = useIsMutating();
  const isLoading = countOfMutations + countOfFetches !== 0;

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
      <Head>
        <title>Planner - Personal Settings</title>
      </Head>
      <AppContextProvider>
        <div>
          <Sidebar
            header={
              <div className="cursor-pointer">
                <Link href="/app/dashboard">
                  <div className="flex flex-row items-center">
                    <div>
                      <ArrowBackIcon />
                    </div>
                    <span className="ml-2 font-bold text-md">Back</span>
                  </div>
                </Link>
              </div>
            }
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            navigation={navigation}
          />
          <DashboardBodyLayout
            setSidebarOpen={setSidebarOpen}
            isLoading={isLoading}
            topRightNav={<ProfileIconButton />}
          >
            {props.children}
          </DashboardBodyLayout>
        </div>
      </AppContextProvider>
    </SnackbarProvider>
  );
};

export default TeamSettingsLayout;
