import { ReactNode } from 'react';

import AppDefaultLayout from '../../../components/AppDefaultLayout';

const Dashboard = () => {
  return <h1>dashboard</h1>;
};

Dashboard.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Dashboard;
