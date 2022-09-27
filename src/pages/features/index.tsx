import Image from 'next/image';
import { ReactNode } from 'react';

import LandingPageLayout from '../../components/LandingPageLayout';

export default function HomePage() {
  return (
    <div className="pb-24">
      <div className="lg:relative">
        <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <p className="block text-primary">Map your project</p>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Planner allows you to plan a project from end-to-end and see all
              of the tasks and dependencies along the way.
            </p>
          </div>
        </div>
        <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
          <Image
            className="absolute inset-0 h-full w-full object-contain"
            src="/images/map-demo-compressed.png"
            alt="Screenshot of the application"
            layout="fill"
            priority
          />
        </div>
      </div>

      <div className="lg:relative">
        <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <p className="block text-primary">Manage discoveries</p>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Find something new? Easily add it to the project and make your new
              plan.
            </p>
          </div>
        </div>
        <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
          <Image
            className="absolute inset-0 h-full w-full object-contain"
            src="/images/adding-task.gif"
            alt="Screenshot of the application"
            layout="fill"
          />
        </div>
      </div>

      <div className="lg:relative">
        <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
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
        </div>
        <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
          <Image
            className="absolute inset-0 h-full w-full object-contain"
            src="/images/task-details-compressed.png"
            alt="Screenshot of the application"
            layout="fill"
          />
        </div>
      </div>
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
        </div>
      </div>
    </div>
  );
}

HomePage.getLayout = (page: ReactNode) => {
  return <LandingPageLayout>{page}</LandingPageLayout>;
};
