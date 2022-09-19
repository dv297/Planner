import { ReactNode } from 'react';

import TeamSettingsLayout from '../../../components/TeamSettingsLayout';

const Page = () => {
  return <div>Team Settings</div>;
};

Page.getLayout = function getLayout(page: ReactNode) {
  return <TeamSettingsLayout>{page}</TeamSettingsLayout>;
};

export default Page;
