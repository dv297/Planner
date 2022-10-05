import { useDrag } from 'react-dnd';
import { clsx } from 'clsx';
import Link from 'next/link';
import { z } from 'zod';

import UserAvatar from '@src/components/common/UserAvatar';
import IssueStatusPill from '@src/components/IssueStatusPill';
import { IssueSchema } from '@src/schemas/IssueSchema';
import { convertToIssueStatusType } from '@src/types/IssueStatusType';
import { parseIssueTagFromIssue } from '@src/utils/parseIssueTagFromIssue';

interface IssueListItemProps {
  issue: z.infer<typeof IssueSchema>;
  allowDrag?: boolean;
}

const IssueListItem = (props: IssueListItemProps) => {
  const { issue, allowDrag } = props;
  const issueTag = parseIssueTagFromIssue(issue);

  const [{ isDragging }, drag] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: 'BOX',
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: issue,
  }));

  const style = isDragging
    ? {
        // transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: 0.5,
        zIndex: '100000',
      }
    : undefined;

  return (
    <div
      className="px-4 py-3.5 grid-cols-12 grid"
      key={issue.id}
      ref={allowDrag ? drag : undefined}
      style={style}
    >
      <span className="col-span-2 text-gray-900">
        <Link href={`/app/issue/${issueTag}`}>
          <span className="cursor-pointer hover:text-primary">{issueTag}</span>
        </Link>
      </span>
      <span className="col-span-6 text-gray-600">
        <Link href={`/app/issue/${issueTag}`}>
          <span
            className={clsx(
              {
                'line-through': issue.issueStatus === 'CLOSED',
              },
              'cursor-pointer hover:text-primary'
            )}
          >
            {issue.title}
          </span>
        </Link>
      </span>
      <span className="col-span-2 flex justify-center">
        {issue.assignee && <UserAvatar user={issue.assignee} />}
      </span>
      <span className="col-span-2 flex justify-end">
        <IssueStatusPill
          issueStatus={convertToIssueStatusType(issue.issueStatus)}
        />
      </span>
    </div>
  );
};

export default IssueListItem;
