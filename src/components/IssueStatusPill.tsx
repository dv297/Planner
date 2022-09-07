import { clsx } from 'clsx';

interface IssueStatusPillProps {
  issueStatus: string;
}

interface ColorPalette {
  backgroundColor: string;
  textColor: string;
}

const getColors = (status: string): ColorPalette => {
  switch (status) {
    case 'PLANNING': {
      return {
        backgroundColor: 'bg-teal-800',
        textColor: 'text-white',
      };
    }
    case 'IN_PROGRESS': {
      return {
        backgroundColor: 'bg-green-600',
        textColor: 'text-white',
      };
    }
    case 'IN_REVIEW': {
      return {
        backgroundColor: 'bg-orange-600',
        textColor: 'text-white',
      };
    }
    case 'TESTING': {
      return {
        backgroundColor: 'bg-purple-500',
        textColor: 'text-white',
      };
    }
    case 'COMPLETE': {
      return {
        backgroundColor: 'bg-blue-500',
        textColor: 'text-white',
      };
    }
    case 'CLOSED': {
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

  const text = issueStatus.replace('_', ' ').toUpperCase();

  const { backgroundColor, textColor } = getColors(issueStatus);
  return (
    <div
      className={clsx(
        'w-32 rounded rounded-2xl px-4 py-0.5 flex justify-center items-center',
        backgroundColor
      )}
    >
      <span className={clsx('text-xs font-bold', textColor)}>{text}</span>
    </div>
  );
};

export default IssueStatusPill;
