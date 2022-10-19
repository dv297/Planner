import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { SnackbarSeverity, useSnackbar } from '@src/components/common/Snackbar';
import IssueAssigneeSelectorView, {
  IssueAssigneeValue,
} from '@src/components/pages/issue/IssueAssigneeSelectorView';
import { useProjectMapContext } from '@src/components/ProjectMap/ProjectMapContext';
import { TeamMemberUserSchema } from '@src/schemas/TeamSettingsSchema';
import IssueService from '@src/services/IssueService';
import TeamMembersService from '@src/services/TeamMembersService';

interface IssueAssigneeSelectorProps {
  issueTag: string | undefined;
  initialAssignee: z.infer<typeof TeamMemberUserSchema> | null;
}

const IssueAssigneeSelector = (props: IssueAssigneeSelectorProps) => {
  const { issueTag, initialAssignee } = props;

  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const { data } = useQuery(['members'], TeamMembersService.getTeamMembers, {
    refetchOnWindowFocus: false,
    enabled: hasBeenOpened,
  });

  const snackbar = useSnackbar();
  const queryClient = useQueryClient();
  const projectMapContext = useProjectMapContext();

  const getUpdaterFunction =
    (tag: string | undefined, propertyName: string) =>
    async (textValue: string | null) => {
      try {
        await IssueService.updateIssue(tag, propertyName, textValue);
        queryClient.invalidateQueries();

        if (projectMapContext?.refresh) {
          projectMapContext.refresh();
        }
      } catch (err) {
        snackbar.displaySnackbar({
          message:
            'There was an error saving your change. Make a change and try again',
          severity: SnackbarSeverity.ERROR,
        });
      }
    };

  const options: IssueAssigneeValue[] = data
    ? data.members.map((member) => {
        return {
          name: member.user.name,
          id: member.user.id,
          image: member.user.image,
          email: member.user.email,
        };
      })
    : [];

  return (
    <div>
      <IssueAssigneeSelectorView
        onChange={getUpdaterFunction(issueTag, 'assigneeId')}
        onOpen={() => {
          setHasBeenOpened(true);
        }}
        initialAssignee={initialAssignee}
        values={options}
      />
    </div>
  );
};

export default IssueAssigneeSelector;
