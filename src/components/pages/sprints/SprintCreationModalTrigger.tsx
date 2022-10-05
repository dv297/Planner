import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import dynamic from 'next/dynamic';

import Button from '@src/components/common/Button';
const SprintCreationModal = dynamic(
  () => import('@src/components/pages/sprints/SprintCreationModal')
);

const SprintCreationModalTrigger = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <SprintCreationModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <div className="mr-2">
          <AddIcon />
        </div>
        <span>Add a Sprint</span>
      </Button>
    </>
  );
};

export default SprintCreationModalTrigger;
