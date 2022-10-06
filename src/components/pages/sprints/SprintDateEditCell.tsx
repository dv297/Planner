import { TextField } from '@mui/material';
import { useGridApiContext } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { z } from 'zod';

import { SprintSchema } from '@src/schemas/SprintSchema';

interface SprintDateEditCellProps {
  sprint: z.infer<typeof SprintSchema>;
  propertyName: keyof z.infer<typeof SprintSchema>;
  label: string;
}

const SprintDateEditCell = (props: SprintDateEditCellProps) => {
  const { propertyName, sprint, label } = props;
  const gridApiRef = useGridApiContext();

  return (
    <DatePicker
      label={label}
      value={sprint[propertyName]}
      onChange={(newValue) => {
        gridApiRef.current.setEditCellValue({
          id: sprint.id,
          field: propertyName,
          value: newValue,
        });
      }}
      renderInput={(params) => {
        return <TextField size="small" label={label} {...params} />;
      }}
    />
  );
};

export default SprintDateEditCell;
