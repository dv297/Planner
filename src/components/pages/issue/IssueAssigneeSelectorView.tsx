import { ListItemIcon } from '@mui/material';
import clsx from 'clsx';
import { z } from 'zod';

import Dropdown from '@src/components/common/Forms/Dropdown';
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

  const dropdownOptions: IssueAssigneeValue[] = [
    { id: UNASSIGNED, email: '', image: '', name: 'Unassigned' },
    ...values,
  ];

  if (dropdownOptions.length === 0 && initialAssignee) {
    dropdownOptions.push(initialAssignee);
  }

  if (
    initialAssignee &&
    !dropdownOptions.some((option) => option.id === initialAssignee.id)
  ) {
    dropdownOptions.push(initialAssignee);
  }

  return (
    <Dropdown
      id="issue-assignee"
      label="Assignee"
      initialOptionId={initialAssignee?.id}
      onChange={async (assignee) => {
        const idToEmit =
          (assignee?.id !== UNASSIGNED ? assignee?.id : null) ?? null;
        await onChange(idToEmit);
      }}
      onOpen={onOpen}
      displayKey="name"
      renderItem={(assignee, details) => {
        return (
          <li
            key={assignee.id}
            className={clsx(
              details.classes,
              'bg-white dark:bg-gray-700 py-2 px-6 shadow-sm text-base flex flex-row items-center'
            )}
            {...details.props}
          >
            <div>
              {assignee && assignee.image && (
                <ListItemIcon>
                  <div className="mr-4">
                    <UserAvatar user={assignee} />
                  </div>
                </ListItemIcon>
              )}
            </div>
            <div>
              <span>{assignee?.name ?? 'Unassigned'}</span>
            </div>
          </li>
        );
      }}
      options={dropdownOptions}
    />
  );
};

export default IssueAssigneeSelectorView;
