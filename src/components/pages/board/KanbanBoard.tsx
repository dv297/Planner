import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { DropTargetHookSpec } from 'react-dnd/src/hooks/types';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { z } from 'zod';

import DragTargetOverlay from '@src/components/DragTargetOverlay';
import { IssueSchema, IssuesListSchema } from '@src/schemas/IssueSchema';
import IssueService from '@src/services/IssueService';
import IssueStatusType from '@src/types/IssueStatusType';
import getUrlForIssue from '@src/utils/getUrlForIssue';
import { parseIssueTagFromIssue } from '@src/utils/parseIssueTagFromIssue';

interface KanbanCellProps {
  issue: z.infer<typeof IssueSchema>;
}

const KanbanCell = (props: KanbanCellProps) => {
  const { issue } = props;

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
      className="bg-white rounded-md py-3 px-2 flex flex-col text-sm shadow-sm border-solid border"
      ref={drag}
      style={style}
    >
      <Link href={getUrlForIssue(issue)}>
        <span className="font-bold cursor-pointer">{issue.title}</span>
      </Link>
      <span>{issue.assignee?.name ?? 'Unassigned'}</span>
    </div>
  );
};

interface KanbanColumnProps {
  title: string;
  issues: z.infer<typeof IssuesListSchema>;
  issueStatusType: IssueStatusType;
}

const KanbanColumn = (props: KanbanColumnProps) => {
  const { issues, title, issueStatusType } = props;

  const queryClient = useQueryClient();
  const getUpdaterFunction =
    (tag: string | undefined, propertyName: string) =>
    async (textValue: string) => {
      await IssueService.updateIssue(tag, propertyName, textValue);
      queryClient.invalidateQueries();
    };

  const dragAndDropConfigArg = (): DropTargetHookSpec<
    z.infer<typeof IssueSchema>,
    any,
    any
  > => ({
    // The type (or types) to accept - strings or symbols
    accept: 'BOX',
    // Props to collect
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop:
          monitor.canDrop() &&
          !issues.some((issue) => monitor.getItem().id === issue.id),
      };
    },
    drop: (issue) => {
      getUpdaterFunction(
        parseIssueTagFromIssue(issue),
        'issueStatus'
      )(issueStatusType);
    },
  });

  const [{ canDrop }, columnDrop] = useDrop(dragAndDropConfigArg, [issues]);

  return (
    <div className="relative h-full bg-gray-50">
      <DragTargetOverlay
        label={`Update status to ${title}`}
        isOpen={canDrop}
        innerRef={columnDrop}
        id={`issue-status-drag-overlay-${title}`}
      >
        <div className="flex flex-col py-4 px-2 h-full">
          <div className="flex-shrink h-16">
            <span className="font-bold text-lg text-gray-700">{title}</span>
          </div>
          <div className="flex flex-col gap-y-8 grow">
            {issues.map((issue) => {
              return <KanbanCell key={issue.id} issue={issue} />;
            })}
          </div>
        </div>
      </DragTargetOverlay>
    </div>
  );
};

interface KanbanBoardProps {
  issues: z.infer<typeof IssuesListSchema>;
}

const KanbanBoard = (props: KanbanBoardProps) => {
  const { issues } = props;
  const issuesMap = issues.reduce(
    (acc, issue) => {
      if (!acc[issue.issueStatus]) {
        acc[issue.issueStatus] = [];
      }
      acc[issue.issueStatus].push(issue);
      return acc;
    },
    {
      [IssueStatusType.PLANNING]: [],
      [IssueStatusType.NOT_STARTED]: [],
      [IssueStatusType.IN_PROGRESS]: [],
      [IssueStatusType.READY_FOR_REVIEW]: [],
      [IssueStatusType.COMPLETE]: [],
    } as Record<string, z.infer<typeof IssueSchema>[]>
  );

  return (
    <div className="h-full">
      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-2 grid-rows-3 sm:grid-cols-5 sm:grid-rows-1 sm:h-full gap-4 h-full">
          <KanbanColumn
            title="Planning"
            issues={issuesMap[IssueStatusType.PLANNING]}
            issueStatusType={IssueStatusType.PLANNING}
          />
          <KanbanColumn
            title="Not Started"
            issues={issuesMap[IssueStatusType.NOT_STARTED]}
            issueStatusType={IssueStatusType.NOT_STARTED}
          />
          <KanbanColumn
            title="In Progress"
            issues={issuesMap[IssueStatusType.IN_PROGRESS]}
            issueStatusType={IssueStatusType.IN_PROGRESS}
          />
          <KanbanColumn
            title="Ready for Review"
            issues={issuesMap[IssueStatusType.READY_FOR_REVIEW]}
            issueStatusType={IssueStatusType.READY_FOR_REVIEW}
          />
          <KanbanColumn
            title="Complete"
            issues={issuesMap[IssueStatusType.COMPLETE]}
            issueStatusType={IssueStatusType.COMPLETE}
          />
        </div>
      </DndProvider>
    </div>
  );
};

export default KanbanBoard;
