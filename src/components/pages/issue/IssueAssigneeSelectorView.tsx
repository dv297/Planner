import { useCallback, useState } from 'react';
import { InputLabel, ListItemIcon } from '@material-ui/core';
import { FormControl, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/Select';
import { z } from 'zod';

import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import UserAvatar from '@src/components/common/UserAvatar';
import { TeamMemberUserSchema } from '@src/schemas/TeamSettingsSchema';

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

  const dropdownOptions = [...values];

  if (dropdownOptions.length === 0 && initialAssignee) {
    dropdownOptions.push(initialAssignee);
  }

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
          const assignee = dropdownOptions.find(
            (assignee) => assignee.id === value
          );

          return (
            <div className="flex flex-row items-center">
              {assignee && (
                <ListItemIcon>
                  <div className="mr-4">
                    <UserAvatar user={assignee} />
                  </div>
                </ListItemIcon>
              )}
              {assignee?.name ?? 'Unassigned'}
            </div>
          );
        }}
      >
        <MenuItem value={UNASSIGNED}>Unassigned</MenuItem>
        {initialAssignee && (
          <MenuItem value={initialAssignee.id}>
            <ListItemIcon>
              <div className="mr-4">
                <UserAvatar user={initialAssignee} />
              </div>
            </ListItemIcon>
            {initialAssignee.name}
          </MenuItem>
        )}
        {dropdownOptions
          .filter((value) => {
            return value.id !== initialAssignee?.id;
          })
          .map((value) => {
            return (
              <MenuItem key={value.id} value={value.id}>
                <ListItemIcon>
                  <div className="mr-4">
                    <UserAvatar user={value} />
                  </div>
                </ListItemIcon>
                {value.name}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default IssueAssigneeSelectorView;
