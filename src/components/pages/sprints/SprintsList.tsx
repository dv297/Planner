import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { z } from 'zod';

import Button from '@src/components/common/Button';
import BacklogAccordion from '@src/components/pages/sprints/BacklogAccordion';
import SprintAccordion from '@src/components/pages/sprints/SprintAccordion';
import SprintIssueDragContextProvider from '@src/components/SprintIssueDragContext';
import { SprintsListSchema } from '@src/schemas/SprintSchema';

interface SprintsListProps {
  sprints: z.infer<typeof SprintsListSchema>;
  activeSprintId: string | null;
}

const SprintsList = (props: SprintsListProps) => {
  const { sprints, activeSprintId } = props;

  const [isEdit, setIsEdit] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <SprintIssueDragContextProvider>
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
                activeSprintId={activeSprintId}
              />
            </div>
          );
        })}
        <div data-testid="backlog-accordion">
          <BacklogAccordion />
        </div>
      </SprintIssueDragContextProvider>
    </DndProvider>
  );
};

export default SprintsList;
