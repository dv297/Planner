import { ReactNode } from 'react';
import Image from 'next/image';

interface EmptyPlaceholderProps {
  description: ReactNode;
  pluralItemName: string;
  actionButton: ReactNode;
}

const EmptyPlaceholder = (props: EmptyPlaceholderProps) => {
  const { description, pluralItemName, actionButton } = props;
  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full justify-center items-center border-solid border-gray-300 border-b mb-8">
        <div className="grow w-full mt-6 mr-6 prose">{description}</div>
        <div className="flex-none grow-0">
          <div className="flex flex-col items-center w-full text-center">
            <Image
              alt="No entries in list"
              src="/images/empty-list-compressed.png"
              height={250}
              width={250}
              layout="fixed"
              quality={50}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full text-center">
        <span>
          It looks like you do not have any {pluralItemName}! Let&apos;s create
          one!
        </span>
        <div className="mt-4">{actionButton}</div>
      </div>
    </div>
  );
};

export default EmptyPlaceholder;
