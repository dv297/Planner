import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import EditIcon from '@mui/icons-material/Edit';
import { z } from 'zod';

import Button from '@src/components/common/Button';
import BacklogAccordion from '@src/components/pages/sprints/BacklogAccordion';
import SprintAccordion from '@src/components/pages/sprints/SprintAccordion';
import SprintIssueDragContextProvider from '@src/components/SprintIssueDragContext';
import { SprintsListSchema } from '@src/schemas/SprintSchema';
import useNavigateToWorkspaceSpecificPage from '@src/utils/useNavigateToWorkspaceSpecificPage';

interface SprintsListProps {
  sprints: z.infer<typeof SprintsListSchema>;
  activeSprintId: string | null;
}

const SprintsList = (props: SprintsListProps) => {
  const { sprints, activeSprintId } = props;

  const navigateToWorkspaceSpecificPage = useNavigateToWorkspaceSpecificPage();

  return (
    <DndProvider backend={HTML5Backend}>
      <SprintIssueDragContextProvider>
        <div className="mb-3">
          <Button
            onClick={() => {
              navigateToWorkspaceSpecificPage('sprints/edit');
            }}
            variant="text"
          >
            <div className="mr-2">
              <EditIcon />
            </div>
            Edit Existing Sprints
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
