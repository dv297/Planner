import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import Button from '@src/components/common/Button';
import BacklogAccordion from '@src/components/pages/sprints/BacklogAccordion';
import SprintAccordion from '@src/components/pages/sprints/SprintAccordion';
import SprintIssueDragContextProvider, {
  useSprintIssueDragContext,
} from '@src/components/SprintIssueDragContext';
import { IssueSchema } from '@src/schemas/IssueSchema';
import { SprintSchema, SprintsListSchema } from '@src/schemas/SprintSchema';
import QueryKeys from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';

interface SprintsListProps {
  sprints: z.infer<typeof SprintsListSchema>;
}

const SprintsList = (props: SprintsListProps) => {
  const { sprints } = props;

  const [isEdit, setIsEdit] = useState(false);

  const queryClient = useQueryClient();
  const sprintIssueDragContext = useSprintIssueDragContext();

  const { mutate: deleteSprint } = useMutation(
    (id: string) => SprintsService.deleteSprint(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.SPRINTS]);
      },
    }
  );

  return (
    <DndContext
      onDragEnd={async (event) => {
        const draggableData = event.active.data.current;
        const droppableData = event.over?.data.current;

        const issue = IssueSchema.parse(draggableData);

        if (droppableData?.isBacklog) {
          sprintIssueDragContext.moveToBacklog(issue);
        } else {
          console.log('hit');
          const sprint = SprintSchema.parse(droppableData?.sprint);
          console.log(sprint);

          if (sprint) {
            await sprintIssueDragContext.moveToSprint(
              issue,
              sprint.id,
              sprint.name
            );
          }
        }
      }}
    >
      <div className="mb-3">
        <Button onClick={() => setIsEdit((value) => !value)} variant="text">
          <div className="mr-2">{isEdit ? <CloseIcon /> : <EditIcon />}</div>
          {isEdit ? 'Close Edit' : 'Edit'}
        </Button>
      </div>
      {sprints.map((sprint, index) => {
        return (
          <div
            key={sprint.id}
            data-testid={`sprint-accordion-${index}`}
            className="mb-6"
          >
            <SprintAccordion
              sprint={sprint}
              index={index}
              isEdit={isEdit}
              deleteSprint={deleteSprint}
            />
          </div>
        );
      })}
      <div data-testid="backlog-accordion">
        <BacklogAccordion />
      </div>
    </DndContext>
  );
};

export default SprintsList;
