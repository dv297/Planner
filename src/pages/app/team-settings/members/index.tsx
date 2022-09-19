import AddIcon from '@mui/icons-material/Add';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

import Button from '../../../../components/common/Button';
import MemberInvitationModal from '../../../../components/MemberInvitationModal';
import MembersList from '../../../../components/MembersList';
import TeamSettingsLayout from '../../../../components/TeamSettingsLayout';
import TeamMembersService from '../../../../services/TeamMembersService';

const Page = () => {
  const [isAddMembersModalOpen, setIsAddMembersModalOpen] = useState(false);

  const { data } = useQuery(['members'], TeamMembersService.getTeamMembers, {
    refetchOnWindowFocus: false,
  });

  if (!data) {
    return null;
  }

  return (
    <>
      <div>
        <h1 className="text-lg font-bold">Members</h1>
        <div className="mt-4">
          <div className="w-full flex flex-row justify-end">
            <Button
              onClick={() => {
                setIsAddMembersModalOpen(true);
              }}
            >
              <AddIcon />
              <span className="ml-2">Add Members</span>
            </Button>
          </div>
          <div>
            <MembersList members={data.members} />
          </div>
        </div>
      </div>
      <MemberInvitationModal
        isOpen={isAddMembersModalOpen}
        setIsOpen={setIsAddMembersModalOpen}
      />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactNode) {
  return <TeamSettingsLayout>{page}</TeamSettingsLayout>;
};

export default Page;
