import dynamic from 'next/dynamic';

import type { ModalProps } from '@src/components/common/Modal/Modal';

const Modal = dynamic(() => import('@src/components/common/Modal/Modal'));

const LazyModal = (props: ModalProps) => {
  const { isOpen } = props;

  if (!isOpen) {
    return null;
  }

  return <Modal {...props} />;
};

export default LazyModal;
