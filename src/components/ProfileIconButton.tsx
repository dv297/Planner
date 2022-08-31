import { Menu } from '@headlessui/react';
import { useSession } from 'next-auth/react';

import ProfileApplicationMenu from './ProfileApplicationMenu';

const ProfileIconButton = () => {
  const session = useSession();

  if (!session || !session?.data) {
    return null;
  }

  return (
    <Menu as="div" className="ml-3 relative">
      <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <span className="sr-only">Open user menu</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-8 w-8 rounded-full"
          src={session?.data?.user?.image ?? ''}
          alt="Profile picture"
        />
      </Menu.Button>
      <ProfileApplicationMenu />
    </Menu>
  );
};

export default ProfileIconButton;
