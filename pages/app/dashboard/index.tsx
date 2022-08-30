import { ReactNode } from 'react';
import AppDefaultLayout from '../../../src/components/AppDefaultLayout';

interface DashboardProps {}

const Dashboard = (props: DashboardProps) => {
  return <h1>dashboard</h1>;
};

Dashboard.getLayout = function getLayout(page: ReactNode) {
  return <AppDefaultLayout>{page}</AppDefaultLayout>;
};

export default Dashboard;
