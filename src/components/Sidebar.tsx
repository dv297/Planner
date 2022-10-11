import { Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Link from 'next/link';

import { useAppContext } from '@src/components/AppContext';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const injectWorkspaceTag = (href: string, workspaceTag: string) => {
  return href.replace('{WORKSPACE_TAG}', workspaceTag);
};

export interface NavigationElement {
  name: string;
  href: string;
  icon: (props: any) => JSX.Element;
  current: boolean;
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (updatedState: boolean) => void;
  navigation: NavigationElement[];
  header?: ReactNode;
  footer?: ReactNode;
}

const Sidebar = (props: SidebarProps) => {
  const { selectedWorkspace } = useAppContext();

  const { sidebarOpen, setSidebarOpen, navigation, header, footer } = props;

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* Shodow box for sidebar*/}
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pb-4 bg-sidebar">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4 bg-sidebar-feature py-4 border-solid border-b border-gray-200">
                  {header}
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1" data-testid="app-sidebar">
                    {navigation.map((item, index) => (
                      <Link
                        href={injectWorkspaceTag(
                          item.href,
                          selectedWorkspace.tag
                        )}
                        key={index}
                        prefetch={false}
                      >
                        <a
                          key={item.name}
                          onClick={() => {
                            setSidebarOpen(false);
                          }}
                          className={classNames(
                            item.current
                              ? 'sidebar-active-element'
                              : 'sidebar-element',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <>
                            <item.icon
                              className={classNames(
                                item.current
                                  ? 'text-gray-300'
                                  : 'text-gray-400 group-hover:text-gray-300',
                                'mr-4 flex-shrink-0 h-6 w-6'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </>
                        </a>
                      </Link>
                    ))}
                  </nav>
                </div>
                <footer className="py-2">
                  <div className="w-full px-2">{footer}</div>
                </footer>
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-sidebar border-r border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex flex-col overflow-y-auto h-full">
            <div className="flex items-center h-16 flex-shrink-0 px-4 sidebar-feature border-solid border-b border-gray-200 dark:border-gray-700">
              {header}
            </div>
            <nav
              className="flex-1 px-2 py-4 space-y-1"
              data-testid="app-sidebar"
            >
              {navigation.map((item, index) => (
                <Link
                  href={injectWorkspaceTag(item.href, selectedWorkspace.tag)}
                  key={index}
                  prefetch={false}
                >
                  <a
                    key={item.name}
                    className={classNames(
                      item.current
                        ? 'sidebar-active-element'
                        : 'sidebar-element',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? 'text-gray-300'
                          : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
            <footer className="py-2">
              <div className="w-full px-2">{footer}</div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
