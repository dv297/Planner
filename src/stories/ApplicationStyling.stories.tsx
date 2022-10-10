import React from 'react';
import {
  ClipboardCheckIcon,
  FolderIcon,
  HomeIcon,
  TrendingDownIcon,
} from '@heroicons/react/outline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleIcon from '@mui/icons-material/People';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { clsx } from 'clsx';

import { _AppContext } from '@src/components/AppContext';
import ConstrainDashboardContainer from '@src/components/ConstrainDashboardContainer';
import DashboardBodyLayout from '@src/components/DashboardBodyLayout';
import Sidebar, { NavigationElement } from '@src/components/Sidebar';

import EditableTextDisplay from '../components/common/EditableDisplays/EditableTextDisplay';
import IssueStatusPill from '../components/IssueStatusPill';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'theme/Design',
  component: IssueStatusPill,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof EditableTextDisplay>;

const navigation: NavigationElement[] = [
  {
    name: 'Dashboard',
    href: '/app/dashboard',
    icon: HomeIcon,
    current: true,
  },
  {
    name: 'Projects',
    href: '/app/projects/{WORKSPACE_TAG}',
    icon: FolderIcon,
    current: false,
  },
  {
    name: 'Sprints',
    href: '/app/sprints/{WORKSPACE_TAG}',
    icon: TrendingDownIcon,
    current: false,
  },
  {
    name: 'Board',
    href: '/app/board/{WORKSPACE_TAG}',
    icon: ClipboardCheckIcon,
    current: false,
  },
];

interface ColorSwatchProp {
  backgroundColor?: string;
  className?: string;
}

const ColorSwatch = (props: ColorSwatchProp) => {
  const { backgroundColor, className } = props;
  return (
    <div
      className={clsx('h-32 w-32 rounded-lg', className)}
      style={{ backgroundColor }}
    />
  );
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableTextDisplay> = () => (
  <>
    <_AppContext.Provider
      value={{
        teams: [],
        workspaces: [],
        userPreferences: {
          userId: '',
          hasFinishedSetup: true,
          id: '',
          workspaceId: '',
          teamId: '',
        },
        selectedWorkspace: {
          name: '',
          id: '',
          tag: '',
        },
        selectedTeam: {
          name: '',
          id: '',
        },
      }}
    >
      <Sidebar
        header={
          <div className="cursor-pointer">
            <div className="flex flex-row items-center">
              <div>
                <ArrowBackIcon />
              </div>
              <span className="ml-2 font-bold text-md">Back</span>
            </div>
          </div>
        }
        footer={
          <button
            className={
              'sidebar-element group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full'
            }
            onClick={() => {}}
          >
            <PeopleIcon
              className={
                'text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6'
              }
              aria-hidden="true"
            />
            Personal
          </button>
        }
        navigation={navigation}
        setSidebarOpen={() => {}}
        sidebarOpen
      />
      <DashboardBodyLayout setSidebarOpen={() => {}} isLoading={false}>
        <ConstrainDashboardContainer>
          <p className="mb-4 font-bold text-lg">Color Swatches</p>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-row gap-x-4">
              <ColorSwatch className="bg-accent-blue-900" />
              <ColorSwatch className="bg-accent-blue-700" />
              <ColorSwatch className="bg-accent-blue-500" />
              <ColorSwatch className="bg-accent-blue-300" />
              <ColorSwatch className="bg-accent-blue-100" />
            </div>
          </div>
        </ConstrainDashboardContainer>
      </DashboardBodyLayout>
    </_AppContext.Provider>
  </>
);

export const Primary = Template.bind({});
Primary.args = {};
