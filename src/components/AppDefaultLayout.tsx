import { ReactNode, useState } from 'react';

import DashboardBodyLayout from './DashboardBodyLayout';
import Sidebar from './Sidebar';

interface AppDefaultLayoutProps {
  children: ReactNode;
}

const AppDefaultLayout = (props: AppDefaultLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <DashboardBodyLayout setSidebarOpen={setSidebarOpen}>
          {props.children}
        </DashboardBodyLayout>
      </div>
    </>
  );
};

export default AppDefaultLayout;
