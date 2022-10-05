import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import DragTargetOverlay from '@src/components/DragTargetOverlay';
import BacklogIssuesList from '@src/components/pages/sprints/BacklogIssuesList';

const BacklogAccordion = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const { setNodeRef: titleDrop, active } = useDroppable({
    id: `backlog-droppable-title`,
    data: {
      isBacklog: true,
    },
  });

  const { setNodeRef: bodyDrop } = useDroppable({
    id: `backlog-droppable-body`,
    data: {
      isBacklog: true,
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
        aria-controls="panel-backlog-content"
        id="panel-backlog-header"
      >
        <DragTargetOverlay
          label={isAccordionOpen ? '' : 'Move issue to backlog'}
          isOpen={!!active}
          innerRef={titleDrop}
          id="backlog-drag-overlay-title"
        >
          <div className="grid grid-cols-12 items-center w-full">
            <div className="col-span-2">
              <Typography>Backlog</Typography>
            </div>
            <div className="col-span-9" />
            <div className="col-span-1 flex-row justify-end" />
          </div>
        </DragTargetOverlay>
      </AccordionSummary>
      <AccordionDetails>
        <DragTargetOverlay
          label={isAccordionOpen ? 'Move issue to backlog' : ''}
          isOpen={!!active}
          innerRef={bodyDrop}
          id="backlog-drag-overlay-body"
        >
          <BacklogIssuesList />
        </DragTargetOverlay>
      </AccordionDetails>
    </Accordion>
  );
};

export default BacklogAccordion;
