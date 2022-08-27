import { Menu } from '@headlessui/react';
import ProfileApplicationMenu from './ProfileApplicationMenu';
import { useSession } from 'next-auth/react';

interface ProfileIconButtonProps {}

const ProfileIconButton = (props: ProfileIconButtonProps) => {
  const session = useSession();

  if (!session || !session?.data) {
    return null;
  }

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src={session?.data?.user?.image ?? ''}
            alt="Profile picture"
          />
        </Menu.Button>
      </div>
      <ProfileApplicationMenu />
    </Menu>
  );
};

export default ProfileIconButton;
