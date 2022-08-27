import AppDefaultLayout from '../../../src/components/AppDefaultLayout';
import { ReactNode } from 'react';

const Page = () => {
  return <h1>Team</h1>;
};

Page.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Page;
