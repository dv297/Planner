import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { DropTargetHookSpec } from 'react-dnd/src/hooks/types';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { z } from 'zod';

import { useAppContext } from '@src/components/AppContext';
import Button from '@src/components/common/Button';
import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import DragTargetOverlay from '@src/components/DragTargetOverlay';
import SprintIssuesList from '@src/components/pages/sprints/SprintIssuesList';
import { useSprintIssueDragContext } from '@src/components/SprintIssueDragContext';
import { IssueSchema } from '@src/schemas/IssueSchema';
import { SprintSchema } from '@src/schemas/SprintSchema';
import QueryKeys from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';

const formatDate = (date: Date) => {
  return format(new Date(date), 'M/d/yy');
};

interface SprintAccordionProps {
  sprint: z.infer<typeof SprintSchema>;
  isEdit: boolean;
  activeSprintId: string | null;
  index: number;
}

const SprintAccordion = (props: SprintAccordionProps) => {
  const { sprint, isEdit, index, activeSprintId } = props;

  const sprintIssueDragContext = useSprintIssueDragContext();
  const appContext = useAppContext();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  const { mutate: setActiveSprint } = useMutation(
    () =>
      SprintsService.setActiveSprint(
        appContext.selectedWorkspace.tag,
        sprint.id
      ),
    {
      onSuccess: () => {
        snackbar.displaySnackbar({
          message: 'Updated active sprint!',
          severity: SnackbarSeverity.SUCCESS,
        });
        queryClient.invalidateQueries([QueryKeys.SPRINTS]);
      },
    }
  );

  const { mutate: deleteSprint } = useMutation(
    () => SprintsService.deleteSprint(sprint.id),
    {
      onSuccess: () => {
        snackbar.displaySnackbar({
          message: 'Deleted sprint!',
          severity: SnackbarSeverity.SUCCESS,
        });
        queryClient.invalidateQueries([QueryKeys.SPRINTS]);
      },
    }
  );

  const dragAndDropConfigArg = (): DropTargetHookSpec<any, any, any> => ({
    // The type (or types) to accept - strings or symbols
    accept: 'BOX',
    // Props to collect
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop:
          monitor.canDrop() &&
          (monitor.getItem() as z.infer<typeof IssueSchema>).sprintId !==
            sprint.id,
      };
    },
    drop: (item) => {
      const issue = IssueSchema.parse(item);
      sprintIssueDragContext.moveToSprint(issue, sprint.id, sprint.name);
    },
  });

  const [{ canDrop }, titleDrop] = useDrop(dragAndDropConfigArg, [sprint]);
  const [, bodyDrop] = useDrop(dragAndDropConfigArg, [sprint]);

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
          isOpen={canDrop}
          innerRef={titleDrop}
          id={`sprint-drag-overlay-${index}-title`}
        >
          <div
            className="grid grid-cols-12 items-center w-full"
            id={`panel-${sprint.id}-header`}
          >
            <div className="col-span-4">
              <Typography>
                {sprint.name}
                {sprint.id === activeSprintId ? ' - Active Sprint' : ''}
              </Typography>
            </div>
            <div className="col-span-6">
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
              <div className="col-span-2 flex-row justify-end items-end">
                <Button
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setActiveSprint();
                  }}
                  variant="text"
                  isDisabled={sprint.id === activeSprintId}
                >
                  <PlayArrowIcon titleAccess="Set as Active Sprint" />
                </Button>
                <Button
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    deleteSprint();
                  }}
                  variant="text"
                >
                  <DeleteIcon titleAccess="Delete Sprint" />
                </Button>
              </div>
            )}
          </div>
        </DragTargetOverlay>
      </AccordionSummary>
      <AccordionDetails>
        <DragTargetOverlay
          label={isAccordionOpen ? `Move issue to ${sprint.name}` : ''}
          isOpen={canDrop}
          innerRef={bodyDrop}
          id={`sprint-drag-overlay-${index}-body`}
        >
          <SprintIssuesList sprintId={sprint.id} />
        </DragTargetOverlay>
      </AccordionDetails>
    </Accordion>
  );
};

export default SprintAccordion;
