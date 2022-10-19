import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import dynamic from 'next/dynamic';

import Button, { ButtonProps } from '@src/components/common/Button';
const SprintCreationModal = dynamic(
  () => import('@src/components/pages/sprints/SprintCreationModal')
);

interface SprintCreationModalTriggerProps {
  variant?: 'normal' | 'small';
}

const SprintCreationModalTrigger = (props: SprintCreationModalTriggerProps) => {
  const { variant = 'normal' } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonProps: Partial<ButtonProps> =
    variant === 'small'
      ? {
          variant: 'text',
        }
      : {};

  return (
    <>
      <SprintCreationModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <Button
        {...buttonProps}
        onClick={() => {
          setIsModalOpen(true);
        }}
        icon={<AddIcon />}
      >
        Create a Sprint
      </Button>
    </>
  );
};

export default SprintCreationModalTrigger;
