import { ReactNode, useState } from 'react';
import {
  ClipboardCheckIcon,
  FolderIcon,
  HomeIcon,
  TrendingDownIcon,
} from '@heroicons/react/outline';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { AppContextProvider } from '@src/components/AppContext';
import FullScreenLoader from '@src/components/common/FullScreenLoader';
import DashboardBodyLayout from '@src/components/DashboardBodyLayout';
import ProfileIconButton from '@src/components/ProfileIconButton';
import Sidebar, { NavigationElement } from '@src/components/Sidebar';
import TeamSelector from '@src/components/TeamSelector';
import {
  MuiWrapper,
  ThemeSwitcher,
} from '@src/components/ThemeSwitcherContext';
import ThemeSwitcherProvider from '@src/components/ThemeSwitcherContext';
import WorkspaceSelector from '@src/components/WorkspaceSelector';
import FeatureFlags from '@src/FeatureFlags';

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

  const countOfFetches = useIsFetching();
  const countOfMutations = useIsMutating();
  const isLoading = countOfMutations + countOfFetches !== 0;

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
    <ThemeSwitcherProvider>
      <MuiWrapper>
        <AppContextProvider>
          <Head>
            <title>Planner</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <div>
            <Sidebar
              header={<WorkspaceSelector />}
              footer={FeatureFlags.allowMultipleTeams ? <TeamSelector /> : null}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              navigation={navigation}
            />
            <DashboardBodyLayout
              setSidebarOpen={setSidebarOpen}
              isLoading={isLoading}
              topRightNav={
                <div className="flex flex-row items-center">
                  <div className="h-6 w-6 mr-2">
                    <ThemeSwitcher />
                  </div>
                  <ProfileIconButton />
                </div>
              }
            >
              {props.children}
            </DashboardBodyLayout>
          </div>
        </AppContextProvider>
      </MuiWrapper>
    </ThemeSwitcherProvider>
  );
};

export default AppDefaultLayout;
