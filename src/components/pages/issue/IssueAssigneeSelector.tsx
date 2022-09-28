import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { z } from 'zod';

import { TeamMemberUserSchema } from '../../../schemas/TeamSettingsSchema';
import IssueService from '../../../services/IssueService';
import TeamMembersService from '../../../services/TeamMembersService';
import IssueAssigneeSelectorView, {
  IssueAssigneeValue,
} from './IssueAssigneeSelectorView';

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
