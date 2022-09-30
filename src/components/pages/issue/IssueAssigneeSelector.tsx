import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import IssueAssigneeSelectorView, {
  IssueAssigneeValue,
} from '@src/components/pages/issue/IssueAssigneeSelectorView';
import { TeamMemberUserSchema } from '@src/schemas/TeamSettingsSchema';
import IssueService from '@src/services/IssueService';
import TeamMembersService from '@src/services/TeamMembersService';

interface IssueAssigneeSelectorProps {
  issueTag: string | undefined;
  initialAssignee: z.infer<typeof TeamMemberUserSchema> | null;
}

const getUpdaterFunction =
  (tag: string | undefined, propertyName: string) =>
  async (textValue: string | null) => {
    await IssueService.updateIssue(tag, propertyName, textValue);
  };

const IssueAssigneeSelector = (props: IssueAssigneeSelectorProps) => {
  const { issueTag, initialAssignee } = props;

  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const { data } = useQuery(['members'], TeamMembersService.getTeamMembers, {
    refetchOnWindowFocus: false,
    enabled: hasBeenOpened,
  });

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
