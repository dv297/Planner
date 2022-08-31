import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';

const Page = () => {
  return <h1>Team</h1>;
};

Page.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Page;
