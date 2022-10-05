import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { z } from 'zod';

import Button from '@src/components/common/Button';
import BacklogIssuesList from '@src/components/pages/sprints/BacklogIssuesList';
import SprintIssuesList from '@src/components/pages/sprints/SprintIssuesList';
import SprintIssueDragContextProvider from '@src/components/SprintIssueDragContext';
import { SprintsListSchema } from '@src/schemas/SprintSchema';
import QueryKeys from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';

const formatDate = (date: Date) => {
  return format(new Date(date), 'M/d/yy');
};

interface SprintsListProps {
  sprints: z.infer<typeof SprintsListSchema>;
}

const SprintsList = (props: SprintsListProps) => {
  const { sprints } = props;

  const [isEdit, setIsEdit] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteSprint } = useMutation(
    (id: string) => SprintsService.deleteSprint(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.SPRINTS]);
      },
    }
  );

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
            <div key={sprint.id} data-testid={`sprint-accordion-${index}`}>
              <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${sprint.id}-content`}
                  id={`panel-${sprint.id}-header`}
                >
                  <div className="grid grid-cols-12 items-center w-full">
                    <div className="col-span-2">
                      <Typography>{sprint.name}</Typography>
                    </div>
                    <div className="col-span-9">
                      <div className="flex flex-row">
                        {sprint.beginDate && (
                          <Typography>
                            {formatDate(sprint.beginDate)}
                          </Typography>
                        )}
                        {sprint.endDate && (
                          <Typography>
                            {' '}
                            - {formatDate(sprint.endDate)}
                          </Typography>
                        )}
                      </div>
                    </div>
                    {isEdit && (
                      <div className="col-span-1 flex-row justify-end">
                        <Button
                          onClick={() => deleteSprint(sprint.id)}
                          variant="text"
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <SprintIssuesList
                    sprintId={sprint.id}
                    sprintName={sprint.name}
                    index={index}
                  />
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
        <Accordion TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-backlog-content`}
            id={`panel-backlog-header`}
          >
            <div className="grid grid-cols-12 items-center w-full">
              <div className="col-span-2">
                <Typography>Backlog</Typography>
              </div>
              <div className="col-span-9" />
              <div className="col-span-1 flex-row justify-end" />
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <BacklogIssuesList />
          </AccordionDetails>
        </Accordion>
      </SprintIssueDragContextProvider>
    </DndProvider>
  );
};

export default SprintsList;
