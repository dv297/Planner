import { DataGrid } from '@mui/x-data-grid';
import { z } from 'zod';

import { TeamMembersListSchema } from '@src/schemas/TeamSettingsSchema';

interface MembersListProps {
  members: z.infer<typeof TeamMembersListSchema>;
}

const MembersList = (props: MembersListProps) => {
  const { members } = props;

  return (
    <div className="h-96">
      <DataGrid
        columns={[
          {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            minWidth: 300,
          },
          {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            minWidth: 300,
          },
        ]}
        rows={members.map((teamUser) => teamUser.user)}
      />
    </div>
  );
};

export default MembersList;
