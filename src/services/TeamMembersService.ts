import { TeamMembersResponseSchema } from '../schemas/TeamSettingsSchema';

const TeamMembersService = {
  getTeamMembers: async () => {
    const result = await fetch(`/api/team-settings/members`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await result.json();

    const response = TeamMembersResponseSchema.parse(data);

    return response.data;
  },
  inviteTeammate: async ({ email }: { email: string }) => {
    const body = { email };
    const response = await fetch('/api/team-settings/members/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Response failed');
    }
  },
};

export default TeamMembersService;
