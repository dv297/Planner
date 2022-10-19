import { ReactNode, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';

import Button from '@src/components/common/Button';
import ConstrainDashboardContainer from '@src/components/ConstrainDashboardContainer';
import MemberInvitationModal from '@src/components/MemberInvitationModal';
import MembersList from '@src/components/MembersList';
import TeamSettingsLayout from '@src/components/TeamSettingsLayout';
import TeamMembersService from '@src/services/TeamMembersService';

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
              icon={<AddIcon />}
            >
              Add Members
            </Button>
          </div>
          <div className="mt-4">
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
  return (
    <TeamSettingsLayout>
      <Head>
        <title>Planner - Team Settings</title>
      </Head>
      <ConstrainDashboardContainer>{page}</ConstrainDashboardContainer>
    </TeamSettingsLayout>
  );
};

export default Page;
