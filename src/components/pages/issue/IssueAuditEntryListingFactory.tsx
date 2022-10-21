import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
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
        <img
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-1 ring-white"
          src={user.image}
          alt="User image"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div>
          <div className="text-sm">
            <span className="font-medium text-gray-500">{user.name}</span>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Commented {formatDate(issueAuditEntry.createdAt)}
          </p>
        </div>
        <div className="mt-2 text-sm text-gray-700">
          <MarkdownPreview value={issueAuditEntry.newValue} />
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
        <img
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-1 ring-white"
          src={user.image}
          alt="User image"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div>
          <div className="text-sm">
            <span className="font-medium text-gray-500">{user.name}</span>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Change made at {formatDate(issueAuditEntry.createdAt)}
          </p>
        </div>
        <div className="mt-2 text-sm text-gray-700">
          <p>
            Changed value from <i>{issueAuditEntry.oldValue}</i> to{' '}
            <i>{issueAuditEntry.newValue}</i>
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
