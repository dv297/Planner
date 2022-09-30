import { Menu } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';

import UserAvatar from '@src/components/common/UserAvatar';
import ProfileApplicationMenu from '@src/components/ProfileApplicationMenu';
import QueryKeys from '@src/services/QueryKeys';
import SettingsService from '@src/services/SettingsService';

const ProfileIconButton = () => {
  const { data } = useQuery(
    [QueryKeys.PERSONAL_INFORMATION],
    SettingsService.getPersonalInformation,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (!data) {
    return null;
  }

  return (
    <Menu as="div" className="ml-3 relative">
      <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <span className="sr-only">Open user menu</span>
        <UserAvatar user={data} />
      </Menu.Button>
      <ProfileApplicationMenu />
    </Menu>
  );
};

export default ProfileIconButton;
