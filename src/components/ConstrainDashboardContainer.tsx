import { ReactNode } from 'react';

interface ConstrainDashboardContainerProps {
  children: ReactNode;
}

const ConstrainDashboardContainer = (
  props: ConstrainDashboardContainerProps
) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full">
      <div className="max-w-screen-lg mx-auto">{props.children}</div>
    </div>
  );
};

export default ConstrainDashboardContainer;
