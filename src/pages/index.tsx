import { ReactNode } from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';

import LandingPageLayout from '@src/components/LandingPageLayout';

const ActionItemButton = (props: { title: string }) => {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        const hasSession = await getSession();

        if (hasSession) {
          await router.push('/app/dashboard');
        } else {
          await signIn(undefined, {
            callbackUrl: '/app/dashboard',
          });
        }
      }}
      className="flex w-full items-center justify-center rounded-md border border-transparent bg-accent-blue-500 px-8 py-3 text-base font-medium text-white hover:bg-accent-blue-700 md:py-4 md:px-10 md:text-lg"
    >
      {props.title}
    </button>
  );
};

const useScrollAnimation = (yCoordinates: [number, number]) => {
  const { scrollY } = useViewportScroll();

  const leftXDisplacement = useTransform(scrollY, yCoordinates, [
    '-5px',
    '0vw',
  ]);
  const rightXDisplacement = useTransform(scrollY, yCoordinates, [
    '5px',
    '0vw',
  ]);
  const opacity = useTransform(scrollY, yCoordinates, [0.4, 1]);

  return {
    leftXDisplacement,
    rightXDisplacement,
    opacity,
  };
};

export default function HomePage() {
  const section1 = useScrollAnimation([200, 600]);
  const section2 = useScrollAnimation([800, 1200]);

  return (
    <div className="pb-24">
      <div className="lg:relative">
        <motion.div
          className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left"
          style={{ x: -10 }}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
            <h1 className="font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <p className="text-4xl block text-accent-blue-700">
                Ditch your to-do list
              </p>{' '}
              <p className="text-7xl block text-primary">Map your moves</p>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              With all the moving parts and dependencies, to-do lists don&apos;t
              convey the right story. With Planner, you can always see
              what&apos;s up next for you and your team.
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <ActionItemButton title="Get Started" />
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2"
          style={{ x: 20 }}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            className="absolute inset-0 h-full w-full object-contain"
            src="/images/map-demo-compressed.png"
            alt="Screenshot of the application"
            layout="fill"
            priority
          />
        </motion.div>
      </div>
      {/* "Manage discoveries" section */}
      <motion.div
        className="lg:relative"
        style={{
          opacity: section1.opacity,
        }}
      >
        <motion.div
          className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left"
          style={{ x: section1.leftXDisplacement }}
        >
          <div className="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <p className="block text-primary">Manage discoveries</p>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Find something new? Easily add it to the project and make your new
              plan.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2"
          style={{ x: section1.rightXDisplacement }}
        >
          <Image
            className="absolute inset-0 h-full w-full object-contain"
            src="/images/adding-task.gif"
            alt="Screenshot of the application"
            layout="fill"
          />
        </motion.div>
      </motion.div>

      {/* "Provide Clarity" section */}
      <motion.div
        className="lg:relative"
        style={{
          opacity: section2.opacity,
        }}
      >
        <motion.div
          style={{ x: section2.leftXDisplacement }}
          className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left"
        >
          <div className="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <p className="block text-primary">Provide clarity</p>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Planner has all the typical fields you would expect to ensure your
              team knows what a particular story entails, with formatting
              enabled through Markdown.
            </p>
          </div>
        </motion.div>
        <motion.div
          style={{ x: section2.rightXDisplacement }}
          className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2"
        >
          <Image
            className="absolute inset-0 h-full w-full object-contain"
            src="/images/task-details-compressed.png"
            alt="Screenshot of the application"
            layout="fill"
          />
        </motion.div>
      </motion.div>

      <div className="flex justify-center items-center">
        <hr className="w-2/3" />
      </div>
      <div>
        <div className="w-full text-center mt-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <p className="block text-primary">
              With more planned for the future!
            </p>
          </h1>
        </div>
        <div>
          <p className="mx-auto mt-6 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            Planner is a passion project, built to help solve the problems I
            faced when planning projects for the companies I have worked for.
          </p>
        </div>
        <div className="px-16 mt-8">
          <ul className="flex flex-col list-disc text-xl text-gray-700 space-y-4 xl:items-center xl:list-none xl:text-2xl">
            <li>
              Import from and export to other issue tracking systems like Jira
              and Linear
            </li>
            <li>Integrations with version control systems like Github</li>
            <li>Notification on completion of milestones</li>
            <li>... and others features suggested by the community!</li>
          </ul>
          <div className="flex flex-row justify-center mt-8">
            <div className="w-72">
              <ActionItemButton title="Try it out!" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

HomePage.getLayout = (page: ReactNode) => {
  return <LandingPageLayout>{page}</LandingPageLayout>;
};
