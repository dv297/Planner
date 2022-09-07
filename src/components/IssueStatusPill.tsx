import { clsx } from 'clsx';

import IssueStatusType from '../types/IssueStatusType';

interface IssueStatusPillProps {
  issueStatus: IssueStatusType;
}

interface ColorPalette {
  backgroundColor: string;
  textColor: string;
}

const getColors = (status: string): ColorPalette => {
  switch (status) {
    case IssueStatusType.PLANNING: {
      return {
        backgroundColor: 'bg-teal-800',
        textColor: 'text-white',
      };
    }
    case IssueStatusType.NOT_STARTED: {
      return {
        backgroundColor: 'bg-purple-500',
        textColor: 'text-white',
      };
    }
    case IssueStatusType.IN_PROGRESS: {
      return {
        backgroundColor: 'bg-green-600',
        textColor: 'text-white',
      };
    }
    case IssueStatusType.READY_FOR_REVIEW: {
      return {
        backgroundColor: 'bg-orange-600',
        textColor: 'text-white',
      };
    }
    case IssueStatusType.COMPLETE: {
      return {
        backgroundColor: 'bg-blue-500',
        textColor: 'text-white',
      };
    }
    case IssueStatusType.CLOSED: {
      return {
        backgroundColor: 'bg-blue-900',
        textColor: 'text-white',
      };
    }
    default: {
      return {
        backgroundColor: 'bg-gray-500',
        textColor: 'text-white',
      };
    }
  }
};

const IssueStatusPill = (props: IssueStatusPillProps) => {
  const { issueStatus } = props;

  const text = issueStatus.split('_').join(' ').toUpperCase();

  const { backgroundColor, textColor } = getColors(issueStatus);
  return (
    <div
      className={clsx(
        'w-40 rounded rounded-2xl px-4 py-2 flex justify-center items-center',
        backgroundColor
      )}
    >
      <span className={clsx('text-xs font-bold', textColor)}>{text}</span>
    </div>
  );
};

export default IssueStatusPill;
