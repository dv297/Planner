import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { DataGrid } from '@mui/x-data-grid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { z } from 'zod';

import { useAppContext } from '@src/components/AppContext';
import Button from '@src/components/common/Button';
import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import SprintDateEditCell from '@src/components/pages/sprints/SprintDateEditCell';
import {
  SprintSchema,
  SprintsListSchema,
  UpdateSingleSprintElementListSchema,
} from '@src/schemas/SprintSchema';
import QueryKeys from '@src/services/QueryKeys';
import SprintsService from '@src/services/SprintsService';

const calculateDiff = (a: any, b: any) => {
  const diffs: z.infer<typeof UpdateSingleSprintElementListSchema> = [];

  for (const property in a) {
    if (a[property] !== b[property]) {
      diffs.push({
        propertyName: property,
        data: a[property],
      });
    }
  }

  return diffs;
};

const formatDate = (date: Date | null) => {
  if (!date) {
    return date;
  }

  return format(new Date(date), 'M/d/yy');
};

interface SprintsEditList {
  sprints: z.infer<typeof SprintsListSchema>;
  activeSprintId: string | null;
}

const SprintsEditList = (props: SprintsEditList) => {
  const { sprints, activeSprintId } = props;

  const appContext = useAppContext();
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  const { mutate: setActiveSprint } = useMutation(
    (sprint: z.infer<typeof SprintSchema>) =>
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
    (sprint: z.infer<typeof SprintSchema>) =>
      SprintsService.deleteSprint(sprint.id),
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

  return (
    <div className="h-96">
      <DataGrid
        columns={[
          {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            minWidth: 300,
            editable: true,
          },
          {
            field: 'beginDate',
            headerName: 'Begin Date',
            width: 175,
            editable: true,
            valueGetter: (params) => formatDate(params.row.beginDate),
            renderEditCell: (params) => {
              const sprint = params.row;

              return (
                <SprintDateEditCell
                  sprint={sprint}
                  propertyName="beginDate"
                  label="Begin Date"
                />
              );
            },
          },
          {
            field: 'endDate',
            headerName: 'End Date',
            width: 175,
            editable: true,
            valueGetter: (params) => formatDate(params.row.endDate),
            renderEditCell: (params) => {
              const sprint = params.row;

              return (
                <SprintDateEditCell
                  sprint={sprint}
                  propertyName="endDate"
                  label="End Date"
                />
              );
            },
          },
          {
            field: 'isActive',
            headerName: 'Active',
            width: 100,
            renderCell: (sprint) => {
              return <div>{sprint.id === activeSprintId ? 'Active' : ''}</div>;
            },
          },
          {
            field: '_actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (cellParams) => {
              const sprint = cellParams.row;
              return (
                <div className="col-span-2 flex-row justify-end items-end">
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setActiveSprint(sprint);
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
                      deleteSprint(sprint);
                    }}
                    variant="text"
                  >
                    <DeleteIcon titleAccess="Delete Sprint" />
                  </Button>
                </div>
              );
            },
          },
        ]}
        rows={sprints}
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={async (sprint, oldSprint) => {
          try {
            const diffs = calculateDiff(sprint, oldSprint);
            await SprintsService.updateSprint(sprint.id, diffs);
            snackbar.displaySnackbar({
              message: 'Updated sprint!',
              severity: SnackbarSeverity.SUCCESS,
            });
            return sprint;
          } catch (err) {
            console.error('Error occurred while updating sprint');
            console.error(err);
            return oldSprint;
          }
        }}
      />
    </div>
  );
};

export default SprintsEditList;
