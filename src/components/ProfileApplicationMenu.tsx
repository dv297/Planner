import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { Fragment } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const userNavigation = [
  { name: 'Settings', href: '/app/settings' },
  { name: 'Sign out', href: '#' },
];

const ProfileApplicationMenu = () => {
  const router = useRouter();

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        {userNavigation.map((item) => (
          <Menu.Item key={item.name}>
            {({ active }) => (
              <button
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                )}
                onClick={() => {
                  if (item.name === 'Sign out') {
                    signOut({
                      callbackUrl: '/logout',
                    });
                  } else {
                    router.push(item.href);
                  }
                }}
              >
                {item.name}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Transition>
  );
};

export default ProfileApplicationMenu;
