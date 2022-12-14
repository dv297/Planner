import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface DragTargetOverlay {
  label: string;
  isOpen: boolean;
  children: ReactNode;
  innerRef: (element: HTMLElement | null) => void;
  id: string;
}

const DragTargetOverlay = (props: DragTargetOverlay) => {
  const { label, isOpen, children, innerRef, id } = props;

  if (!isOpen) {
    return (
      <div ref={innerRef} id={id}>
        {children}
      </div>
    );
  }

  return (
    <div ref={innerRef} id={id}>
      <div
        className={clsx({
          'absolute top-0 bottom-0 right-0 left-0 bg-gray-900 opacity-75':
            isOpen,
        })}
      />
      <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center text-center px-2">
        <span className="text-white font-bold">{label}</span>
      </div>
      {children}
    </div>
  );
};

export default DragTargetOverlay;
