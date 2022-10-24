import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import ThemeSwitcherProvider, {
  ThemeSwitcher,
} from '@src/components/ThemeSwitcherContext';

interface LandingPageLayoutProps {
  children: ReactNode;
}

const OnboardingLayout = (props: LandingPageLayoutProps) => {
  return (
    <ThemeSwitcherProvider>
      <div className="relative bg-theme-background flex flex-col min-h-screen">
        <div className="sticky bg-theme-background shadow basis-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
              <div className="flex justify-start lg:w-0 flex-1">
                <Link href="/">
                  <>
                    <span className="sr-only">Planner</span>
                    <Image
                      className="w-auto"
                      src="/images/logo/logo-no-background.svg"
                      alt=""
                      height="24"
                      width="150"
                    />
                  </>
                </Link>
              </div>
              <div className="flex flex-row items-center">
                <div className="h-6 w-6 mr-2">
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="relative flex-1 h-full text-black dark:text-white">
          {props.children}
        </main>
      </div>
    </ThemeSwitcherProvider>
  );
};

export default OnboardingLayout;
