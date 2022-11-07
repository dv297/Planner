import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { z } from 'zod';

import { IssueAuditEntrySchema } from '@src/schemas/IssueSchema';
const MarkdownPreview = dynamic(
  () => import('@src/components/common/EditableDisplays/MarkdownPreview')
);

const formatDate = (dateString: Date) => {
  return new Date(dateString).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

interface IssueAuditEntryListingProps {
  issueAuditEntry: z.infer<typeof IssueAuditEntrySchema>;
}

const CommentListing = (props: IssueAuditEntryListingProps) => {
  const { issueAuditEntry } = props;
  const { user } = issueAuditEntry;

  return (
    <>
      <div className="relative">
        <Image
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-1 ring-white"
          src={user.image}
          alt="User image"
          height={40}
          width={40}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div>
          <div className="text-sm">
            <span className="font-medium text-gray-500 dark:text-gray-400">
              {user.name}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            Commented {formatDate(issueAuditEntry.createdAt)}
          </p>
        </div>
        <div className="mt-2 text-sm text-gray-700">
          <MarkdownPreview value={issueAuditEntry.newValue ?? ''} />
        </div>
      </div>
    </>
  );
};

const HistoryListing = (props: IssueAuditEntryListingProps) => {
  const { issueAuditEntry } = props;
  const { user } = issueAuditEntry;

  return (
    <>
      <div className="relative">
        <Image
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-1 ring-white"
          src={user.image}
          alt="User image"
          height={40}
          width={40}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div>
          <div className="text-sm">
            <span className="font-medium text-gray-500 dark:text-gray-400">
              {user.name}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            Change made at {formatDate(issueAuditEntry.createdAt)}
          </p>
        </div>
        <div className="mt-2 text-sm text-gray-700 dark:text-gray-100">
          <p>
            Changed{' '}
            {issueAuditEntry.propertyName
              ? `"${issueAuditEntry.propertyName}"`
              : ''}{' '}
            value from <i>&quot;{issueAuditEntry.oldValue}&quot;</i> to{' '}
            <i>&quot;{issueAuditEntry.newValue}&quot;</i>
          </p>
        </div>
      </div>
    </>
  );
};

interface IssueAuditEntryListingFactoryProps {
  issueAuditEntry: z.infer<typeof IssueAuditEntrySchema>;
  isLastItem: boolean;
}

const IssueAuditEntryListingFactory = (
  props: IssueAuditEntryListingFactoryProps
) => {
  const { issueAuditEntry, isLastItem } = props;

  let listing: ReactNode | null = null;

  switch (issueAuditEntry.type) {
    case 'COMMENT': {
      listing = <CommentListing issueAuditEntry={issueAuditEntry} />;
      break;
    }
    case 'CHANGE': {
      listing = <HistoryListing issueAuditEntry={issueAuditEntry} />;
      break;
    }
    default: {
      // No-op
    }
  }

  return (
    <div className="relative pb-8">
      {!isLastItem ? (
        <span
          className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
          aria-hidden="true"
        />
      ) : null}
      <div className="relative flex items-start space-x-3">{listing}</div>
    </div>
  );
};

export default IssueAuditEntryListingFactory;
