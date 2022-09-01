import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/solid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Fragment, ReactNode } from 'react';

import QueryKeys from '../services/QueryKeys';
import UserPreferencesService from '../services/UserPreferencesService';
import { useAppContext } from './AppContext';

interface WorkspaceMenuItemProps {
  children: ReactNode;
  onClick: () => void;
}

const WorkspaceMenuItem = (props: WorkspaceMenuItemProps) => {
  return (
    <div className="px-1 py-1 ">
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={props.onClick}
            className={`${
              active ? 'bg-violet-500 text-white' : 'text-gray-900'
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            {props.children}
          </button>
        )}
      </Menu.Item>
    </div>
  );
};

const WorkspaceSelector = () => {
  const router = useRouter();
  const { workspaces, userPreferences } = useAppContext();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    [QueryKeys.USER_PREFERENCES],
    UserPreferencesService.update,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.USER_PREFERENCES]);
      },
    }
  );

  const onWorkspaceSelection = async ({ id }: { id: string }) => {
    await mutation.mutate({
      id: userPreferences.id,
      workspaceId: id,
    });
  };

  const onAddWorkSpaceClick = () => {
    router.push('/app/workspace');
  };

  if (!workspaces) {
    return null;
  }

  const selectedWorkspace =
    workspaces.find((entry) => entry.id === userPreferences.workspaceId) ??
    workspaces[0];

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <Menu.Button className="w-full text-gray-200 text-xs font-bold flex flex-row items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-9 w-auto mr-2 rounded-md bg-white border-blue-300 border-solid border-2"
          src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
          alt="Workflow"
        />
        <div className="flex-grow text-left">
          <p>{selectedWorkspace.name}</p>
          <p>({selectedWorkspace.tag})</p>
        </div>
        <ChevronDownIcon
          className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
          aria-hidden="true"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {workspaces.map((workspace) => {
            if (workspace.id === selectedWorkspace.id) {
              return null;
            }

            return (
              <WorkspaceMenuItem
                onClick={() => onWorkspaceSelection(workspace)}
                key={workspace.id}
              >
                <span className="flex-grow text-left">{workspace.name}</span>
              </WorkspaceMenuItem>
            );
          })}
          <WorkspaceMenuItem onClick={onAddWorkSpaceClick}>
            <PlusIcon className="h-5 w-5 mr-2" />
            <span className="flex-grow text-left">Add a workspace</span>
          </WorkspaceMenuItem>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default WorkspaceSelector;
