import { Avatar, InputLabel, ListItemIcon } from '@material-ui/core';
import { FormControl, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/Select';
import md5 from 'md5';
import { useCallback, useState } from 'react';
import { z } from 'zod';

import { TeamMemberUserSchema } from '../../../schemas/TeamSettingsSchema';
import { SnackbarSeverity, useSnackbar } from '../../common/Snackbar';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const getAvatar = (assignee: IssueAssigneeValue) => {
  const address = String(assignee.email).trim().toLowerCase();

  const hash = md5(address);

  return (
    <div className="mr-4">
      <Avatar
        src={`https://www.gravatar.com/avatar/${hash}?d=404`}
        {...stringAvatar(assignee.name)}
      />
    </div>
  );
};

export interface IssueAssigneeValue {
  name: string;
  id: string;
  image: string;
  email: string;
}

interface IssueAssigneeSelectorProps {
  onChange: (value: string | null) => Promise<void>;
  onOpen: () => void;
  initialAssignee: z.infer<typeof TeamMemberUserSchema> | null;
  values: IssueAssigneeValue[];
}

const UNASSIGNED = 'UNASSIGNED_VALUE';

const IssueAssigneeSelectorView = (props: IssueAssigneeSelectorProps) => {
  const { onChange, onOpen, initialAssignee, values } = props;
  const [value, setValue] = useState(initialAssignee?.id || UNASSIGNED);
  const { displaySnackbar } = useSnackbar();

  const handleChange = useCallback(
    async (event: SelectChangeEvent) => {
      try {
        const updatedValue =
          event.target.value === UNASSIGNED ? null : event.target.value;
        await onChange(updatedValue);
        setValue(event.target.value);
      } catch (err) {
        console.error(err);
        displaySnackbar({
          severity: SnackbarSeverity.ERROR,
          message:
            'There was an error saving the field. Please try again later.',
        });
      }
    },
    [onChange, displaySnackbar]
  );

  return (
    <FormControl fullWidth>
      <InputLabel id="input-status-selector-label">Assignee</InputLabel>
      <Select
        labelId="input-status-selector-label"
        id="input-status-selector"
        value={value}
        label="Assignee"
        onChange={handleChange}
        size="small"
        onOpen={onOpen}
        renderValue={(value) => {
          const assignee = values.find((assignee) => assignee.id === value);

          return (
            <div className="flex flex-row items-center">
              {assignee && <ListItemIcon>{getAvatar(assignee)}</ListItemIcon>}
              {assignee?.name ?? 'Unassigned'}
            </div>
          );
        }}
      >
        <MenuItem value={UNASSIGNED}>Unassigned</MenuItem>
        {initialAssignee && (
          <MenuItem value={initialAssignee.id}>
            <ListItemIcon>{getAvatar(initialAssignee)}</ListItemIcon>
            {initialAssignee.name}
          </MenuItem>
        )}
        {values
          .filter((value) => {
            return value.id !== initialAssignee?.id;
          })
          .map((value) => {
            return (
              <MenuItem key={value.id} value={value.id}>
                <ListItemIcon>{getAvatar(value)}</ListItemIcon>
                {value.name}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default IssueAssigneeSelectorView;
