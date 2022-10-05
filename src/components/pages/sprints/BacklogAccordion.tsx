import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { DropTargetHookSpec } from 'react-dnd/src/hooks/types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { z } from 'zod';

import DragTargetOverlay from '@src/components/DragTargetOverlay';
import BacklogIssuesList from '@src/components/pages/sprints/BacklogIssuesList';
import { useSprintIssueDragContext } from '@src/components/SprintIssueDragContext';
import { IssueSchema } from '@src/schemas/IssueSchema';

const BacklogAccordion = () => {
  const sprintIssueDragContext = useSprintIssueDragContext();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const dragAndDropConfigArg = (): DropTargetHookSpec<any, any, any> => ({
    // The type (or types) to accept - strings or symbols
    accept: 'BOX',
    // Props to collect
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop:
          monitor.canDrop() &&
          (monitor.getItem() as z.infer<typeof IssueSchema>).sprintId !== null,
      };
    },
    drop: (item) => {
      const issue = IssueSchema.parse(item);
      sprintIssueDragContext.moveToBacklog(issue);
    },
  });

  const [{ canDrop }, titleDrop] = useDrop(dragAndDropConfigArg, []);
  const [, bodyDrop] = useDrop(dragAndDropConfigArg, []);

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
          isOpen={canDrop}
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
          isOpen={canDrop}
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
