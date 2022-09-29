import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

import Button from '../../common/Button';
import SprintCreationModal from './SprintCreationModal';

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
