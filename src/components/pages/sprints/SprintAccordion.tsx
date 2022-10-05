import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { z } from 'zod';

import Button from '@src/components/common/Button';
import DragTargetOverlay from '@src/components/DragTargetOverlay';
import SprintIssuesList from '@src/components/pages/sprints/SprintIssuesList';
import { SprintSchema } from '@src/schemas/SprintSchema';

const formatDate = (date: Date) => {
  return format(new Date(date), 'M/d/yy');
};

interface SprintAccordionProps {
  sprint: z.infer<typeof SprintSchema>;
  isEdit: boolean;
  deleteSprint: (sprintId: string) => void;
  index: number;
}

const SprintAccordion = (props: SprintAccordionProps) => {
  const { sprint, isEdit, deleteSprint, index } = props;

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const { setNodeRef: setNodeRefForTitle, active } = useDroppable({
    id: `sprint-droppable-${sprint.id}-title`,
    data: {
      sprint,
    },
  });

  const { setNodeRef: setNodeRefForBody } = useDroppable({
    id: `sprint-droppable-${sprint.id}-body`,
    data: {
      sprint,
    },
  });

  return (
    <Accordion
      expanded={isAccordionOpen}
      onChange={(event, isExpanded) => {
        setIsAccordionOpen(isExpanded);
      }}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${sprint.id}-content`}
      >
        <DragTargetOverlay
          label={isAccordionOpen ? '' : `Move issue to ${sprint.name}`}
          isOpen={!!active}
          innerRef={setNodeRefForTitle}
          id={`sprint-drag-overlay-${index}-title`}
        >
          <div
            className="grid grid-cols-12 items-center w-full"
            id={`panel-${sprint.id}-header`}
          >
            <div className="col-span-2">
              <Typography>{sprint.name}</Typography>
            </div>
            <div className="col-span-9">
              <div className="flex flex-row">
                {sprint.beginDate && (
                  <Typography>{formatDate(sprint.beginDate)}</Typography>
                )}
                {sprint.endDate && (
                  <Typography> - {formatDate(sprint.endDate)}</Typography>
                )}
              </div>
            </div>
            {isEdit && (
              <div className="col-span-1 flex-row justify-end">
                <Button onClick={() => deleteSprint(sprint.id)} variant="text">
                  <DeleteIcon />
                </Button>
              </div>
            )}
          </div>
        </DragTargetOverlay>
      </AccordionSummary>
      <AccordionDetails>
        <DragTargetOverlay
          label={isAccordionOpen ? `Move issue to ${sprint.name}` : ''}
          isOpen={!!active}
          innerRef={setNodeRefForBody}
          id={`sprint-drag-overlay-${index}-body`}
        >
          <SprintIssuesList sprintId={sprint.id} />
        </DragTargetOverlay>
      </AccordionDetails>
    </Accordion>
  );
};

export default SprintAccordion;
